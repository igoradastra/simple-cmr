import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from '@tanstack/react-table';
import Cookies from 'js-cookie';
import { deleteUser, getUsers, updateUser } from '../../api/users';
import { User } from '../../api/types/Users';

export const UsersTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedValues, setEditedValues] = useState<Partial<User>>({});

  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: !!Cookies.get('user'),
  });

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: (updatedUser: User) => updateUser(`${updatedUser.id}`, updatedUser),
    onMutate: async (newUserData) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
      const previousUsers = queryClient.getQueryData<User[]>(['users']);
      queryClient.setQueryData<User[]>(['users'], old => {
        if (!old) return [];
        return old.map(user => user.id === newUserData.id ? newUserData : user);
      });
      return { previousUsers };
    },
    onError: (err, newUserData, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData<User[]>(['users'], context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onSuccess: () => {
      setEditingRow(null);
      setEditedValues({});
    }
  });

  const columnHelper = createColumnHelper<User>();

  const columns = useMemo(() => [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => {
        const rowId = info.row.original.id;
        if (editingRow === rowId) {
          return (
            <input
              type="text"
              value={editedValues.name !== undefined ? editedValues.name : info.getValue()}
              onChange={e => setEditedValues(prev => ({ ...prev, name: e.target.value }))}
              style={{ width: '100%' }}
            />
          );
        }
        return info.getValue();
      },
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => {
        const rowId = info.row.original.id;
        if (editingRow === rowId) {
          return (
            <input
              type="email"
              value={editedValues.email !== undefined ? editedValues.email : info.getValue()}
              onChange={e => setEditedValues(prev => ({ ...prev, email: e.target.value }))}
              style={{ width: '100%' }}
            />
          );
        }
        return info.getValue();
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: info => {
        const user = info.row.original;
        const isEditing = editingRow === user.id;

        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    const updatedUser = { ...user, ...editedValues };
                    updateUserMutation(updatedUser);
                  }}
                  style={{ backgroundColor: '#ccc', border: '1px solid #999', padding: '4px 8px', cursor: 'pointer' }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingRow(null);
                    setEditedValues({});
                  }}
                  style={{ backgroundColor: '#ccc', border: '1px solid #999', padding: '4px 8px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setEditingRow(user.id);
                    setEditedValues({});
                  }}
                  style={{ backgroundColor: '#ccc', border: '1px solid #999', padding: '4px 8px', cursor: 'pointer' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUserMutation(`${user.id}`)}
                  style={{ backgroundColor: '#ccc', border: '1px solid #999', padding: '4px 8px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        );
      },
    }),
  ], [editingRow, editedValues]);

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (!Cookies.get('user')) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Please log in to view users</div>;
  }

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Users</h1>

      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      borderBottom: '2px solid black',
                      padding: '8px',
                      cursor: 'pointer',
                      backgroundColor: '#f0f0f0'
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <span style={{ paddingLeft: '4px' }}>
                      {header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? '▲' : '▼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid #ccc' }}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} style={{ padding: '8px', textAlign: 'left' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            style={{ backgroundColor: '#ccc', border: '1px solid #999', padding: '4px 8px', cursor: 'pointer' }}
          >
            {'<<'}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            style={{ backgroundColor: '#ccc', border: '1px solid #999', padding: '4px 8px', cursor: 'pointer' }}
          >
            {'<'}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            style={{ backgroundColor: '#ccc', border: '1px solid #999', padding: '4px 8px', cursor: 'pointer' }}
          >
            {'>'}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            style={{ backgroundColor: '#ccc', border: '1px solid #999', padding: '4px 8px', cursor: 'pointer' }}
          >
            {'>>'}
          </button>
        </div>

        <div>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>

        <div>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            style={{ padding: '4px' }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
