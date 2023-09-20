import { ColumnDef } from "@tanstack/react-table"
import { AlertCircle, AlertTriangle, CheckCheck, MoreHorizontal, Trash, RefreshCcw } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from './column-header'

import { Bill } from "@/lib/types"

export const columns: ColumnDef<Bill>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status")
      const color = status === 2 ? "yellow" : status === 3 ? "emerald" : "red"
      return (
        <div className='flex flex-row'>
          {status === 2 ? (
            <>
              <AlertTriangle className={`w-5 h-5 text-${color}-500 mr-2`} />
              <p>Pending</p>
            </>

          ) : status === 3 ? (
            <>
              <CheckCheck className={`w-5 h-5 text-${color}-500 mr-2`} />
              <p>Paid</p>
            </>
          ) : (
            <>
              <AlertCircle className={`w-5 h-5 text-${color}-500 mr-2`} />
              <p>Late</p>
            </>
          )}
        </div>
      )
    }
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.date)
      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(date)
      return <div className="font-medium">{formatted}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      async function handleDelete() {
        // await deleteBill(payment.id)
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center justify-end w-full h-8 p-2">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='focus:text-primary'>
              <RefreshCcw className="w-4 h-4 mr-2" />
              Update Status
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className='focus:text-red-500'
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
