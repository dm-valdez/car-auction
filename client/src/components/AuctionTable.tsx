import { Table, TableBody, TableBodyCells, TableBodyElement, TableHead, TableHeadCell } from './shared/Table.tsx'
import { Auction } from '../lib/types.ts'

type AuctionTablePropType = {
  auctions: Auction[] | undefined
}

export default function AuctionTable({ auctions }: AuctionTablePropType) {
  return (
    <Table>
      <TableHead>
        <TableHeadCell cellName={'Car Brand'} width={20} />
        <TableHeadCell cellName={'Type'} width={10} />
        <TableHeadCell cellName={'Year'} width={10} />
        <TableHeadCell cellName={'Opening Price'} width={10} />
        <TableHeadCell cellName={'Price Increment'} width={10} />
        <TableHeadCell cellName={'Status'} width={20} />
        <TableHeadCell cellName={'Action'} width={20} />
      </TableHead>
      <TableBody>
        {
          auctions && auctions.map(auction => {
            return (
              <TableBodyElement key={auction.id}>
                <TableBodyCells>{auction.car_brand}</TableBodyCells>
                <TableBodyCells>{auction.type}</TableBodyCells>
                <TableBodyCells>{auction.year}</TableBodyCells>
                <TableBodyCells>&#36;{auction.opening_price}</TableBodyCells>
                <TableBodyCells>&#36;{auction.price_increment}</TableBodyCells>
                <TableBodyCells>{auction.status}</TableBodyCells>
                <TableBodyCells>Details</TableBodyCells>
              </TableBodyElement>
            )
          })
        }
      </TableBody>
    </Table>
  )
}
