import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender } from '@tanstack/react-table';
import type { Row } from '@tanstack/react-table';
import type { Flashcard } from "../../types/flashcard.ts";


interface DraggableRowProps {
  row: Row<Flashcard>;
  handleRowClick: (row: Flashcard) => void;
}

export function DraggableRow({ row, handleRowClick }: DraggableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id });

  const style: React.CSSProperties = {
  transform: CSS.Transform.toString(transform),
  transition,
  opacity: isDragging ? 0.6 : 1,
  height: '60px', // Matches CSS
  zIndex: isDragging ? 999 : 1,
  position: isDragging ? 'relative' : undefined,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="table-row"
      {...attributes}
      {...listeners}
      // This will now trigger correctly for the Modal
      onClick={() => handleRowClick(row.original)}
    >
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
}