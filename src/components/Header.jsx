import { useState } from 'react';
import useTodoStore from '../store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('Ongoing');
  const addTodo = useTodoStore((state) => state.addTodo);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const menuItems = ['Tasks', 'Ongoing', 'Completed'];

  const handleLinkClick = (index) => {
    if (index === 0) {
      useTodoStore.setState({ activeStatus: 'All' });
    } else {
      useTodoStore.setState({ activeStatus: menuItems[index] });
    }
    setActiveIndex(index);
  };

  const handleSaveTask = () => {
    if (!title.trim()) {
      toast.error('Task title cannot be empty or consist only of spaces');
      return;
    }

    addTodo(title, notes, status);
    toast.success('Task saved successfully!', {
      position: 'bottom-right',
    });
    setTitle('');
    setNotes('');
    setStatus('Ongoing');
    closeModal();
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
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
          <div className='relative w-auto max-w-3xl mx-auto my-6'>
            <div className='relative flex flex-col  bg-white bg-opacity-10 rounded-xl shadow-lg backdrop-blur-lg  border-0 rounded-lg shadow-lg outline-none focus:outline-none w-96'>
              <div className='flex items-start justify-between p-4 border-b border-solid border-gray-300 rounded-t'>
                <h3 className='text-2xl text-white font-semibold'>To-Do 📝</h3>
              </div>
              <div className='relative  flex-auto '>
                <div className='px-2 py-6 lg:px-8 bg:dark-300 w-460'>
                  <form>
                    <div className='mb-2'>
                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        Task Title
                      </label>
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Enter title here '
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className='mb-2'>
                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        Task Notes
                      </label>
                      <textarea
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Enter title here'
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        Status
                      </label>
                      <select
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value='Ongoing'>Ongoing</option>
                        <option value='Completed'>Completed</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
              <div className='flex items-center justify-end p-4 border-t border-solid border-gray-300 rounded-b'>
                <button
                  className='text-red-400 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                  onClick={handleSaveTask}
                >
                  Save Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='flex items-center justify-between bg-gray-600 mb-4 px-4'>
        <div className='text-white text-2xl'>Simple To-Do App</div>
        <ul className='flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'>
          {menuItems.map((item, index) => (
            <li key={index} className='mr-2'>
              <a
                href='#'
                className={`inline-block p-4 ${
                  activeIndex === index
                    ? 'text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500'
                    : 'rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                }`}
                onClick={() => handleLinkClick(index)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div>
          <button
            className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
            onClick={openModal}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-plus'
            >
              <line x1='12' y1='5' x2='12' y2='19'></line>
              <line x1='5' y1='12' x2='19' y2='12'></line>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
