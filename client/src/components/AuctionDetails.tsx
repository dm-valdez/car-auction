import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './shared/Dialog.tsx'
import Button from './shared/Button.tsx'
import { Auction } from '../lib/types.ts'
import Input from './shared/Input.tsx'
import { cn, validateFields } from '../lib/utils.ts'
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react'
import useAuctionBids from '../hooks/useAuctionBids.ts'
import useNewBid from '../hooks/useNewBid.ts'
import { useQueryClient } from '@tanstack/react-query'
import useAuthStatus from '../hooks/useAuthStatus.ts'
import useGetUser from '../hooks/useGetUser.ts'
import useDeleteAuction from '../hooks/useDeleteAuction.ts'
import { toast } from 'react-toastify'
import useUpdateAuction from '../hooks/useUpdateAuction.ts'

type AuctionDetailsPropType = {
  isDialogOpen: boolean
  setIsDialogOpen: (value: boolean) => void
  selectedAuction: Auction | null
}

export default function AuctionDetails({ isDialogOpen, setIsDialogOpen, selectedAuction }: AuctionDetailsPropType) {
  const [ bidForm, setBidForm ] = useState<boolean>(false)
  const [ amount, setAmount ] = useState<string>('')
  const [ errors, setErrors ] = useState<{ [key: string]: string }>({})

  const queryClient = useQueryClient()
  const { data: authResponse } = useAuthStatus()
  const { data: userResponse } = useGetUser(selectedAuction && selectedAuction.user_id)
  const { data: auctionBids } = useAuctionBids(selectedAuction && selectedAuction.id)
  const deleteAuction = useDeleteAuction()
  const newBid = useNewBid()
  const transferAuction = useUpdateAuction()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedAuction) throw new Error('No auction found.')

    const validationErrors = validateFields({
      amount: {
        value: amount,
        rules: [
          { type: 'required', message: 'Amount is required.' },
          { type: 'numeric', message: 'Amount should be a number.' },
        ],
      },
    })

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const priceIncrement = selectedAuction.price_increment
    let highestBid

    if (auctionBids && auctionBids.length > 0) {
      highestBid = auctionBids[0].amount
    } else {
      highestBid = selectedAuction.opening_price
    }

    if (amount <= highestBid) {
      toast.error(`Minimum bid should be $${Number(priceIncrement) + Number(highestBid)}`)
      return
    }

    const expirationDate = new Date(selectedAuction.expiry_date)
    const today = new Date()


    if (expirationDate <= today) {
      if (!authResponse) throw new Error('No auth response!')

      await transferAuction.mutateAsync({
        id: selectedAuction.id,
        user_id: authResponse.user.id,
      })
      await newBid.mutateAsync({
        user_id: authResponse.user.id,
        auction_id: selectedAuction.id,
        amount: Number(amount),
      })
      await queryClient.invalidateQueries({ queryKey: [ `auction-bid-${selectedAuction.id}` ] })

      toast.success('Congratulations! You have won the bid!')
      setAmount('')
      setErrors({})
    } else {
      await newBid.mutateAsync({
        user_id: selectedAuction.user_id,
        auction_id: selectedAuction.id,
        amount: Number(amount),
      })
      await queryClient.invalidateQueries({ queryKey: [ `auction-bid-${selectedAuction.id}` ] })
      toast.success('Bid successful! Thank you!')
      setAmount('')
      setErrors({})
    }
  }

  const handleDeleteAuction = async () => {
    await deleteAuction.mutateAsync(selectedAuction && selectedAuction.id)
    await queryClient.invalidateQueries({ queryKey: [ `auctions` ] })
    toast.success('Auction deleted successfully.')
    setIsDialogOpen(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setAmount(value)
    setErrors({ ...errors, amount: '' })
  }

  useEffect(() => {
    if (!isDialogOpen) {
      setAmount('')
      setBidForm(false)
      setErrors({})
    }
  }, [ isDialogOpen ])

  return (
    <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={'text-2xl'}>Auction Details</DialogTitle>
        </DialogHeader>
        {
          selectedAuction && (
            <div className="flex flex-col gap-4">
              <div className="">
                <p className={'font-bold'}>
                  Owner: <span className={'font-normal'}>{userResponse && userResponse.user.full_name}</span>
                </p>
                <p className={'font-bold'}>
                  Car Brand: <span className={'font-normal'}>{selectedAuction.car_brand}</span>
                </p>
                <p className={'font-bold'}>Type: <span className={'font-normal'}>{selectedAuction.type}</span></p>
                <p className={'font-bold'}>Year: <span className={'font-normal'}>{selectedAuction.year}</span></p>
                <p className={'font-bold'}>Opening Price: <span
                  className={'font-normal'}>&#36;{selectedAuction.opening_price}</span></p>
                <p className={'font-bold'}>Price Increment: <span
                  className={'font-normal'}>&#36;{selectedAuction.price_increment}</span></p>
                <p className={'font-bold'}>Status: <span className={'font-normal'}>{selectedAuction.status}</span></p>
                <p className={'font-bold'}>Status: <span
                  className={'font-normal'}>{selectedAuction.expiry_date.toString()}</span></p>
                {
                  auctionBids && auctionBids.length > 0 ? (
                    <p className={'text-lg font-bold mt-5'}>Highest Bid: <span
                      className={'font-normal'}>&#36;{auctionBids[0].amount}</span></p>
                  ) : <p className={'text-lg font-bold mt-5'}>No bids yet! Check back soon for updates.</p>
                }
              </div>
            </div>
          )
        }
        {
          authResponse && selectedAuction && (authResponse.user.id !== selectedAuction.user_id) && (
            <form onSubmit={handleSubmit}>
              <DialogFooter>
                {
                  bidForm ? (
                    <div className={'w-full flex flex-col gap-1'}>
                      <Fragment>
                        <Input
                          placeholder={'Amount'}
                          type={'text'}
                          name={'type'}
                          value={amount}
                          onChange={handleChange}
                          className={'text-sm py-2 my-2 mr-2'}
                        />
                        {errors.amount && <p className={'ml-2 text-option-7 text-xs font-medium'}>{errors.amount}</p>}
                      </Fragment>
                      <div className={'flex gap-2'}>
                        <Button
                          title={'CANCEL'}
                          className={cn([
                            'w-full py-2 px-6 my-0',
                            'text-sm rounded-3xl bg-option-4 cursor-pointer',
                            'hover:bg-option-2',
                          ])}
                          onClick={() => setBidForm(false)}
                        />
                        <Button
                          title={'BID'}
                          className={cn([
                            'w-full py-2 px-6 my-0',
                            'text-sm rounded-3xl bg-option-4 cursor-pointer',
                            'hover:bg-option-2',
                          ])}
                          type={'submit'}
                        />
                      </div>
                    </div>
                  ) : <p className={'font-bold text-sm cursor-pointer underline underline-offset-2'}
                         onClick={() => setBidForm(true)}>Ready to bid? Place your offer now!</p>
                }
              </DialogFooter>
            </form>
          )
        }
        {
          !bidForm && (authResponse && authResponse.user && authResponse.user.is_admin) && (
            <Button
              title={'DELETE AUCTION'}
              className={cn([
                'w-full py-4 px-6 my-0',
                'text-sm rounded-3xl bg-option-4 cursor-pointer',
                'hover:bg-option-2',
              ])}
              onClick={handleDeleteAuction}
            />
          )
        }
      </DialogContent>
    </Dialog>
  )
}
