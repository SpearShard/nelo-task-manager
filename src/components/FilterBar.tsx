interface FilterBarProps {
  filter: string;
  setFilter: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
}

export default function FilterBar({ filter, setFilter, search, setSearch }: FilterBarProps) {
  return (
    <div className="flex gap-2 mb-4">
      <select
        className="border p-2 rounded"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>

      <input
        type="text"
        className="border p-2 flex-1 rounded"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
