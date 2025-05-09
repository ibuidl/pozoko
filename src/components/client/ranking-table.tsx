'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export type TableItem = {
  index: number;
  collection: string;
  name: string;
  quantity: string;
  revenue: string;
};

export const columns: ColumnDef<TableItem>[] = [
  {
    accessorKey: 'index',
    header: '#',
  },
  {
    accessorKey: 'collection',
    header: 'Collection',
    cell: ({ row }) => (
      <Image
        src={row.original.collection}
        alt={row.original.name}
        width={40}
        height={40}
        className="size-10 rounded-lg"
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'revenue',
    header: 'Revenue',
  },
];

const data = [
  {
    index: 1,
    collection: '/cluster-default.png',
    name: 'testName',
    quantity: 'testQuantity',
    revenue: 'testRevenue',
  },
  {
    index: 2,
    collection: '/cluster-default.png',
    name: 'testName',
    quantity: 'testQuantity',
    revenue: 'testRevenue',
  },
  {
    index: 3,
    collection: '/cluster-default.png',
    name: 'testName',
    quantity: 'testQuantity',
    revenue: 'testRevenue',
  },
  {
    index: 4,
    collection: '/cluster-default.png',
    name: 'testName',
    quantity: 'testQuantity',
    revenue: 'testRevenue',
  },
  {
    index: 5,
    collection: '/cluster-default.png',
    name: 'testName',
    quantity: 'testQuantity',
    revenue: 'testRevenue',
  },
];

export const RankingTableTabs = () => {
  return (
    <Tabs defaultValue="nftCount" className="flex-grow">
      <TabsList>
        <TabsTrigger value="nftCount">PASS Qty.</TabsTrigger>
        <TabsTrigger value="nftRevenue">Listener Earns.</TabsTrigger>
      </TabsList>
      <TabsContent value="nftCount" className="mt-6">
        <NftCountTable />
      </TabsContent>
    </Tabs>
  );
};

export const NftCountTable = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-xl border flex-grow overflow-hidden">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="first:pl-8">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="h-16"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="first:pl-8">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
