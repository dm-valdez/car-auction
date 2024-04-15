import AuctionTable from '../components/AuctionTable.tsx'
import useAuctions from '../hooks/useAuctions.ts'
import { useState } from 'react'
import AuctionDetails from '../components/AuctionDetails.tsx'
import { Auction } from '../lib/types.ts'
import Button from '../components/shared/Button.tsx'
import NewAuction from '../components/NewAuction.tsx'

export default function AuctionPage() {
  const { data: auctions } = useAuctions()
  const [ isNewAuctionDialogOpen, setIsNewAuctionDialogOpen ] = useState<boolean>(false)
  const [ isAuctionDetailsDialogOpen, setIsAuctionDetailsDialogOpen ] = useState<boolean>(false)
  const [ selectedAuction, setSelectedAuction ] = useState<Auction | null>(null)

  const handleNewAuctionDialogOpen = () => {
    setIsNewAuctionDialogOpen(true)
  }

  const handleAuctionDetailsDialogOpen = (auction: Auction) => {
    setIsAuctionDetailsDialogOpen(true)
    setSelectedAuction(auction)
  }

  return (
    <main className="flex justify-center">
      <div className={'py-16 px-96 w-full'}>
        <div className={'flex justify-between'}>
          <h1 className={'text-4xl text-option-3 font-bold tracking-tight'}>Auction Lists</h1>
          <Button title={'NEW AUCTION'} className={'w-fit py-2 px-8 my-0 text-sm'} onClick={handleNewAuctionDialogOpen}/>
        </div>
        <AuctionTable auctions={auctions} onRowClick={handleAuctionDetailsDialogOpen} />
        <NewAuction isDialogOpen={isNewAuctionDialogOpen} setIsDialogOpen={setIsNewAuctionDialogOpen}/>
        <AuctionDetails isDialogOpen={isAuctionDetailsDialogOpen} setIsDialogOpen={setIsAuctionDetailsDialogOpen} selectedAuction={selectedAuction} />
      </div>
    </main>
  )
}
