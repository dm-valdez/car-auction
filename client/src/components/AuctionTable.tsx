import { Table, TableBody, TableBodyCells, TableBodyElement, TableHead, TableHeadCell } from './shared/Table.tsx'
import { Auction } from '../lib/types.ts'

type AuctionTablePropType = {
  auctions: Auction[]
  onRowClick: (auction: Auction) => void
}

export default function AuctionTable({ auctions, onRowClick }: AuctionTablePropType) {
  return (
    <Table>
      <TableHead>
        <TableHeadCell cellName={'Car Brand'} width={16.5} />
        <TableHeadCell cellName={'Type'} width={16.5} />
        <TableHeadCell cellName={'Year'} width={16.5} />
        <TableHeadCell cellName={'Opening Price'} width={16.5} />
        <TableHeadCell cellName={'Price Increment'} width={16.5} />
        <TableHeadCell cellName={'Status'} width={16.5} />
        <TableHeadCell cellName={'Expired Date'} width={16.5} />
      </TableHead>
      <TableBody>
        {
          auctions && auctions.map(auction => {
            return (
              <TableBodyElement
                key={auction.id}
                className={'cursor-pointer hover:bg-option-1'}
                onRowClick={() => onRowClick(auction)}
              >
                <TableBodyCells>{auction.car_brand}</TableBodyCells>
                <TableBodyCells>{auction.type}</TableBodyCells>
                <TableBodyCells>{auction.year}</TableBodyCells>
                <TableBodyCells>&#36;{auction.opening_price}</TableBodyCells>
                <TableBodyCells>&#36;{auction.price_increment}</TableBodyCells>
                <TableBodyCells>{auction.status}</TableBodyCells>
                <TableBodyCells>{auction.expiry_date.toString()}</TableBodyCells>
              </TableBodyElement>
            )
          })
        }
      </TableBody>
    </Table>
  )
}
