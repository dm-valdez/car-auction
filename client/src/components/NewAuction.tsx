import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './shared/Dialog.tsx'
import Button from './shared/Button.tsx'
import Input from './shared/Input.tsx'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { validateFields } from '../lib/utils.ts'
import { NewAuctionRequest } from '../lib/types.ts'
import useNewAuction from '../hooks/useNewAuction.ts'
import useAuthStatus from '../hooks/useAuthStatus.ts'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

type AuctionDetailsPropType = {
  isDialogOpen: boolean
  setIsDialogOpen: (value: boolean) => void
}

export default function NewAuction({ isDialogOpen, setIsDialogOpen }: AuctionDetailsPropType) {
  const initialFormData: NewAuctionRequest = {
    carBrand: '',
    type: '',
    year: '',
    openingPrice: '',
    priceIncrement: '',
    expirationDate: '',
  }

  const [ formData, setFormData ] = useState<NewAuctionRequest>(initialFormData)
  const [ errors, setErrors ] = useState<{ [key: string]: string }>({})

  const queryClient = useQueryClient()
  const { data } = useAuthStatus()
  const newAuction = useNewAuction()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validateFields({
      carBrand: {
        value: formData.carBrand,
        rules: [ { type: 'required', message: 'Car brand is required.' } ],
      },
      type: {
        value: formData.type,
        rules: [ { type: 'required', message: 'Password is required.' } ],
      },
      year: {
        value: formData.year,
        rules: [
          { type: 'required', message: 'Year is required' },
          { type: 'numeric', message: 'Year should be a number.' },
        ],
      },
      openingPrice: {
        value: formData.openingPrice,
        rules: [
          { type: 'required', message: 'Opening price is required' },
          { type: 'numeric', message: 'Opening price should be a number.' },
        ],
      },
      priceIncrement: {
        value: formData.priceIncrement,
        rules: [
          { type: 'required', message: 'Price increment is required' },
          { type: 'numeric', message: 'Price increment should be a number.' },
        ],
      },
      expirationDate: {
        value: formData.expirationDate,
        rules: [
          { type: 'required', message: 'Expiration date is required.' },
          { type: 'date', message: 'Expiration date should be at least 1 day ahead.' },
        ],
      },
    })

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    await newAuction.mutateAsync({
      ...formData,
      userId: data && data.user.id,
      status: 'Open',
    })

    await queryClient.invalidateQueries({ queryKey: [ 'auctions' ] })
    toast.success('Auction created successfully!')
    setFormData(initialFormData)
    setErrors({})
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
    setErrors({ ...errors, [name]: '' })
  }

  useEffect(() => {
    if (!isDialogOpen) {
      setFormData(initialFormData)
      setErrors({})
    }
  }, [ isDialogOpen ])

  return (
    <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={'text-2xl'}>New Auction</DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder={'Car Brand'}
              type={'text'}
              name={'carBrand'}
              value={formData.carBrand}
              onChange={handleChange}
            />
            {errors.carBrand && <p className={'ml-2 text-option-7 text-xs font-medium'}>{errors.carBrand}</p>}
            <Input
              placeholder={'Type'}
              type={'text'}
              name={'type'}
              value={formData.type}
              onChange={handleChange}
            />
            {errors.type && <p className={'ml-2 text-option-6 text-xs font-medium'}>{errors.type}</p>}
            <Input
              placeholder={'Year'}
              type={'text'}
              name={'year'}
              value={formData.year}
              onChange={handleChange}
            />
            {errors.year && <p className={'ml-2 text-option-6 text-xs font-medium'}>{errors.year}</p>}
            <Input
              placeholder={'Opening Price'}
              type={'text'}
              name={'openingPrice'}
              value={formData.openingPrice}
              onChange={handleChange}
            />
            {errors.openingPrice &&
              <p className={'ml-2 text-option-6 text-xs font-medium'}>{errors.openingPrice}</p>}
            <Input
              placeholder={'Price Increment'}
              type={'text'}
              name={'priceIncrement'}
              value={formData.priceIncrement}
              onChange={handleChange}
            />
            {errors.priceIncrement &&
              <p className={'ml-2 text-option-6 text-xs font-medium'}>{errors.priceIncrement}</p>}
            <p className={'mt-8 ml-2 text-option-1 text-xs font-medium'}>Expiration date</p>
            <Input
              placeholder={'Expiration Date'}
              type={'date'}
              name={'expirationDate'}
              value={formData.expirationDate}
              onChange={handleChange}
            />
            {errors.expirationDate &&
              <p className={'m1-2 ml-2 text-option-6 text-xs font-medium'}>{errors.expirationDate}</p>}
            <DialogFooter>
              <Button title={'Create'} className={'bg-option-4 hover:bg-option-2'} type={'submit'} />
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
