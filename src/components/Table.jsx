import { useState } from 'react';
import useTodoStore from '../store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = () => {
  const todos = useTodoStore((state) => state.todos);
  const activeStatus = useTodoStore((state) => state.activeStatus);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const [editingTodo, setEditingTodo] = useState(null);

  const filteredTodos = todos.filter((todo) => {
    if (activeStatus === 'All') {
      return true;
    }
    return todo.status === activeStatus;
  });

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
  };

  const handleSaveEdit = () => {
    if (editingTodo) {
      if (!editingTodo.title.trim()) {
        toast.error('Task title cannot be empty or consist only of spaces');
        return;
      }
      updateTodo(editingTodo.id, {
        title: editingTodo.title,
        notes: editingTodo.notes,
        status: editingTodo.status,
      });
      toast.success('You successfully save the changes!');

      setEditingTodo(null);
    }
  };

  const handleDeleteClick = (id) => {
    removeTodo(id);
  };

  return (
    <>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
      />
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        {filteredTodos.length === 0 ? (
          <p className='text-gray-500 text-3xl dark:text-gray-400 text-center py-4'>
            No tasks to display. Add a new task to get started.
          </p>
        ) : (
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Task Title
                </th>
                <th scope='col' className='px-6 py-3'>
                  Notes
                </th>
                <th scope='col' className='px-6 py-3'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3'>
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.map((todo) => (
                <tr
                  key={todo.id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {editingTodo?.id === todo.id ? (
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        value={editingTodo.title}
                        onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                      />
                    ) : (
                      todo.title
                    )}
                  </th>
                  <td className='px-6 py-4'>
                    {editingTodo?.id === todo.id ? (
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        value={editingTodo.notes}
                        onChange={(e) => setEditingTodo({ ...editingTodo, notes: e.target.value })}
                      />
                    ) : (
                      todo.notes
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    {editingTodo?.id === todo.id ? (
                      <select
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        value={editingTodo.status}
                        onChange={(e) => setEditingTodo({ ...editingTodo, status: e.target.value })}
                      >
                        <option value='Ongoing'>Ongoing</option>
                        <option value='Completed'>Completed</option>
                      </select>
                    ) : (
                      todo.status
                    )}
                  </td>
                  <td className='px-6 py-4 text-right'>
                    {editingTodo?.id === todo.id ? (
                      <button
                        className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                        onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className='font-medium text-red-600 dark:text-red-500 hover:underline'
                          onClick={() => handleDeleteClick(todo.id)} // Handle task deletion
                        >
                          Delete
                        </button>
                        <button
                          className='font-medium text-blue-600 dark:text-blue-500 hover:underline  ml-4'
                          onClick={() => handleEditClick(todo)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Table;
