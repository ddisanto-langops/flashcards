import { useState } from "react"
import type { Flashcard } from "../../types/flashcard.ts"
import { getAllCards, deleteCard } from "../../services/api.ts"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table'
import type { RowSelectionState, Table } from '@tanstack/react-table'


interface TableProps {
  handleRowClick: (row: Flashcard) => void;
}


const columnHelper = createColumnHelper<Flashcard>()

const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),
  columnHelper.accessor('title', { header: 'Title' }),
  columnHelper.accessor('frontText', { header: "Front Text" }),
  columnHelper.accessor('backText', { header: "Back Text" }),
  columnHelper.accessor('createdAt', { header: "Created" }),
  columnHelper.accessor('updatedAt', { header: "Modified" })
]



export function Table({handleRowClick}: TableProps) {

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  
  const queryClient = useQueryClient()
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['cards'],
    queryFn: getAllCards
  });

  const deleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      return Promise.all(ids.map(id => deleteCard(id)))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] })
      setRowSelection({})
    }
  })

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => row.id,
  });

  const handleDelete = () => {
    const selectedIds = Object.keys(rowSelection)
    if (confirm(`Delete ${selectedIds.length} items?`)) {
      deleteMutation.mutate(selectedIds)
    }
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading products.</p>
  
  return (
    <>
    <div style={{ marginBottom: '10px' }}>
      <button 
        onClick={handleDelete} 
        disabled={Object.keys(rowSelection).length === 0 || deleteMutation.isPending}
      >
        {deleteMutation.isPending ? 'Deleting...' : 'Delete Selected'}
      </button>
    </div>

    <table id="cards-table">
      <thead id="cards-table-head">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                <div
                  className="table-sort-div"
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: 'pointer' }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === 'asc' ? ' ↑' : header.column.getIsSorted() === 'desc' ? ' ↓' : ''}
                </div>
                {header.column.id !== 'select' && (
                  <input
                    className="table-filter"
                    placeholder="Filter..."
                    onChange={e => header.column.setFilterValue(e.target.value)}
                  />
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody id="cards-table-body">
        {table.getRowModel().rows.map(row => (
          <tr className="table-row" key={row.id} onClick={() => handleRowClick(row.original)}>
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
