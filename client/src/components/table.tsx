import { Modal } from './modal.tsx'
import type { RowSelectionState, Table } from '@tanstack/react-table'
import { formatDate } from "../../services/formatDate.ts"
import type { Flashcard } from "../../types/flashcard.ts"
import { getAllCards } from "../../services/api.ts"
import { useQuery } from "@tanstack/react-query"
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  getFilteredRowModel,
} from '@tanstack/react-table'

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DraggableRow } from './dndRow.tsx'

const columnHelper = createColumnHelper<Flashcard>()

const columns = [
  columnHelper.accessor('title', { header: 'Title' }),
  columnHelper.accessor('text', { header: 'Text' }),
  columnHelper.accessor('createdAt', { 
    header: "Created",
    cell: info => formatDate(info.getValue())
  }),
  columnHelper.accessor('updatedAt', { 
    header: "Modified",
    cell: info => formatDate(info.getValue())
  })
]


export function Table() {
  const [selectedCard, setSelectedCard] = useState<Flashcard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: fetchedData = [], isLoading, isError } = useQuery({
    queryKey: ['flashcards'],
    queryFn: getAllCards,
  });

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [data, setData] = useState<Flashcard[]>([]);

  useEffect(() => {
    if (fetchedData.length > 0) setData(fetchedData);
  }, [fetchedData]);

  // Handle opening the modal
  const onOpenModal = (card: Flashcard) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const onHandleClose = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => String(row.id),
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }, 
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setData((items) => {
        const oldIndex = items.findIndex((item) => String(item.id) === active.id);
        const newIndex = items.findIndex((item) => String(item.id) === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }



  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products.</p>;

  return (
    <>
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd}
      >
        <table id="cards-table">
          <thead id="cards-table-head">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    <div className="table-sort-div">
                      {/* flexRender is needed here - import from @tanstack/react-table */}
                      {header.isPlaceholder ? null : header.column.columnDef.header?.toString()}
                    </div>
                    <input
                      className="table-filter"
                      placeholder="Search..."
                      onChange={e => header.column.setFilterValue(e.target.value)}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody id="cards-table-body">
            <SortableContext 
              items={table.getRowModel().rows.map(r => r.id)} 
              strategy={verticalListSortingStrategy}
            >
              {table.getRowModel().rows.map(row => (
                <DraggableRow 
                  key={row.id} 
                  row={row} 
                  handleRowClick={onOpenModal} // Use the renamed internal function
                />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </DndContext>
      
      <Modal 
        isVisible={isModalOpen} 
        data={selectedCard} 
        setModalData={setSelectedCard} 
        closeModal={onHandleClose} 
      />
    </>
  );
}