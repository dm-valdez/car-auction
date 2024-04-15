import React from 'react'

export const Table = ({ children }: { children: React.ReactNode }) => {
  return <table className="w-full text-left mt-8">{children}</table>
}

export const TableHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <thead>
    <tr className={'text-option-3 text-sm tracking-tight'}>
      {children}
    </tr>
    </thead>
  )
}

export const TableHeadCell = ({ cellName, width }: { cellName: string, width: number }) => {
  return <th className={`py-3 pr-3 pl-2 w-[${width}%]`}>{cellName}</th>
}

export const TableBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <tbody>
    {children}
    </tbody>
  )
}

export const TableBodyElement = ({ children, className, onRowClick }: { children: React.ReactNode, className?: string, onRowClick?: () => void }) => {
  return <tr className={`border-t border-slate-700 align-top ${className}`} onClick={onRowClick}>{children}</tr>
}

export const TableBodyCells = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <td className={`py-3 pr-3 pl-2 text-sm ${className ? className : 'text-option-3'}`}>{children}</td>
}
