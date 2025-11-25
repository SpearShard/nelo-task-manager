import { useState } from "react";

interface TaskFormProps {
  onAddTask: (task: {
    title: string;
    description: string;
    priority: string;
    dueDate: string;
  }) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    if (!title || !priority || !dueDate) {
      alert("Title, Priority & Due Date are required!");
      return;
    }

    onAddTask({ title, description, priority, dueDate });

    // Clear form after submit
    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
  };

  return (
    <div className="mb-4 p-4 border rounded bg-white shadow">
      <h2 className="font-bold text-lg mb-2">Add Task</h2>

      <input
        className="border p-2 w-full mb-2"
        type="text"
        placeholder="Task Title (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-2"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        className="border p-2 w-full mb-2"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
        onClick={handleSubmit}
      >
        Add Task
      </button>
    </div>
  );
}
