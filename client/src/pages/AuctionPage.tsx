import AuctionTable from '../components/AuctionTable.tsx'
import useAuctions from '../hooks/useAuctions.tsx'

export default function AuctionPage() {
  const { data } = useAuctions()

  return (
    <main className="flex justify-center">
      <div className={'py-16 px-64 w-full'}>
        <h1 className={'text-4xl text-option-3 font-bold tracking-tight'}>Auction Lists</h1>
        <AuctionTable auctions={data}/>
      </div>
    </main>
  )
}
