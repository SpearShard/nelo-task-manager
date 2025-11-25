// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";
import useDebounce from "../hooks/useDebounce";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  completed: boolean;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300); // Debounce search input

  useEffect(() => {
    if (!sessionStorage.getItem("loggedIn")) {
      window.location.href = "/";
    }
  }, []);

  const addTask = (task: {
    title: string;
    description: string;
    priority: string;
    dueDate: string;
  }) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), completed: false, ...task },
    ]);
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // 🔎 Filtering + Search Logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    if (filter === "Completed") return task.completed && matchesSearch;
    if (filter === "Pending") return !task.completed && matchesSearch;
    if (filter === "High" || filter === "Medium" || filter === "Low")
      return task.priority === filter && matchesSearch;
    
    return matchesSearch;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>

      {/* Add Task */}
      <TaskForm onAddTask={addTask} />

      {/* 🔥 Filter + Search */}
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />

      {/* Show filtered tasks */}
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
}
