// src/components/TaskList.tsx

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (updatedTask: Task) => void;
}

export default function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks yet. Add one above 👆</p>;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => {
        const handleEditClick = () => {
          const newTitle = prompt("Edit task title:", task.title);
          if (newTitle === null) return; // user cancelled
          onEdit({ ...task, title: newTitle });
        };

        const handleDeleteClick = () => {
          if (window.confirm("Are you sure you want to delete this task?")) {
            onDelete(task.id);
          }
        };

        return (
          <div
            key={task.id}
            className="border p-4 rounded bg-white shadow flex items-start justify-between"
          >
            <div>
              <h3
                className={`font-bold ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-700 mb-1">
                  {task.description}
                </p>
              )}

              <div className="flex items-center gap-2 text-sm">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    task.priority === "High"
                      ? "bg-red-500"
                      : task.priority === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {task.priority}
                </span>
                <span className="text-gray-600">Due: {task.dueDate}</span>
                <span className="text-gray-600">
                  Status: {task.completed ? "Completed" : "Pending"}
                </span>
              </div>
            </div>

            <div className="space-x-2 shrink-0">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
              <button
                className={`px-2 py-1 rounded text-sm text-white ${
                  task.completed ? "bg-gray-500" : "bg-green-500"
                }`}
                onClick={() => onToggleComplete(task.id)}
              >
                {task.completed ? "Mark Pending" : "Mark Complete"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
