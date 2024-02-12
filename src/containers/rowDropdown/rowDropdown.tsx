import React, { useState, ChangeEvent } from "react";
import { usePaginationContext } from "../../contexts/pagination-context";

const RowDropdown: React.FC = () => {
  const { setNumberOfRows } = usePaginationContext();
  const [selectedValue, setSelectedValue] = useState<number>(10);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(+event.target.value);
    setNumberOfRows(+event.target.value);
  };

  return (
    <div className="w-15">
      <select
        className="form-select block w-13 mt-1 border py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
        value={selectedValue}
        onChange={handleChange}
      >
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={25}>25</option>
      </select>
    </div>
  );
};

export default RowDropdown;
