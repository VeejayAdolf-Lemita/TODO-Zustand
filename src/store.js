import { create } from 'zustand';

const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (title, notes, status) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now(),
          title,
          notes,
          status,
        },
      ],
    })),
  removeTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  updateTodo: (id, updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo)),
    })),
  activeStatus: 'All', // Initialize with 'All' as the default filter
  setActiveStatus: (status) => set({ activeStatus: status }),
}));

export default useTodoStore;
