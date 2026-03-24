import type { Flashcard } from "../../types/flashcard.ts"
//import React, { useState, useEffect } from "react"
import { getAllCards } from "../../services/api"
import { useQuery } from "@tanstack/react-query"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  getFilteredRowModel,
  flexRender
} from '@tanstack/react-table'

const columnHelper = createColumnHelper<Flashcard>()

const columns = [
  columnHelper.accessor('title', {
    header: 'Title'
  }),
  columnHelper.accessor('frontText', {
    header: "Front Text"
  }),
  columnHelper.accessor('backText', {
    header: "Back Text"
  }),
  columnHelper.accessor('createdAt', {
    header: "Created"
  }),
  columnHelper.accessor('updatedAt', {
    header: "Modified"
  })
]

export function Dashboard() {
    
    const { data = [], isLoading, isError } = useQuery({
    queryKey: ['cards'],
    queryFn: getAllCards
  });


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });


  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading products.</p>
  
  return (
    <>
    <table id="completions-table">
      <thead id="completions-table-head">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
              <th key={header.id}>
                <div
                  className="table-sort-div"
                  title="Click to sort"
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: 'pointer' }}
              >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === 'asc' ? ' ↑'
                  : header.column.getIsSorted() === 'desc' ? ' ↓' : ''}
                </div>
              <input
                className="table-filter"
                placeholder="Filter..."
                onChange={e => header.column.setFilterValue(e.target.value)}
              />
              </th>
          )})}
          </tr>
        ))}
      </thead>
      <tbody id="completions-table-body">
        {table.getRowModel().rows.map(row => (
          <tr className="table-row" style={{ cursor: 'pointer' }} key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td className="table-data" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}