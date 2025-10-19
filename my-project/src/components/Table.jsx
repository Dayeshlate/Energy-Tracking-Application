import React from 'react';
import DarkGlassWrapper from './DarkGlassWrapper';

const Table = ({ columns, data, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <DarkGlassWrapper className="p-6">
        <div className="text-center text-gray-400">Loading...</div>
      </DarkGlassWrapper>
    );
  }

  if (!data || data.length === 0) {
    return (
      <DarkGlassWrapper className="p-6">
        <div className="text-center text-gray-400">No data available</div>
      </DarkGlassWrapper>
    );
  }

  return (
    <DarkGlassWrapper className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-4 text-right text-sm font-semibold text-purple-300 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-white/5 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-sm text-gray-300"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key] || '-'}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 text-right text-sm space-x-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DarkGlassWrapper>
  );
};

export default Table;
