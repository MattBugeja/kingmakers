import { useEffect, useState } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFilter } from "../../contexts/filter-context";

const FilterContainer = () => {
  const [showDatepicker, setShowDatePicker] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const { setStartDate, setEndDate, clearFilter } = useFilter();

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      setStartDate(format(selectedStartDate, "MM-dd-yyyy"));
      setEndDate(format(selectedEndDate, "MM-dd-yyyy"));
      setIsFiltered(true);
      setShowDatePicker(false);
    }
  }, [selectedStartDate, selectedEndDate]);

  return (
    <div className="flex gap-5 h-10 items-center w-full ">
   {!showDatepicker && !isFiltered && (
        <button
          onClick={() => setShowDatePicker(true)}
          className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-200 ease-in-out"
        >
          Filter by Date
        </button>
      )}

      {isFiltered && (
        <div className="flex justify-between w-11/12 items-center">
          <div>{`Showing campaigns between ${
            selectedStartDate ? format(selectedStartDate, "MM-dd-yyyy") : ""
          } and ${selectedEndDate ? format(selectedEndDate, "MM-dd-yyyy") : ""}`}</div>
          <div></div>{" "}
          <button
            onClick={() => {
              setIsFiltered(false);
              setSelectedStartDate(null);
              setSelectedEndDate(null);
              clearFilter()
            }}
            className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-md"
          >
            Clear Dates
          </button>{" "}
        </div>
      )}
      {showDatepicker && (
        <div className="flex gap-5 h-10 items-center">
          <label
            htmlFor="startDate"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Start Date
          </label>
          <DatePicker
            id="startDate"
            selected={selectedStartDate}
            onChange={(date: Date) => setSelectedStartDate(date)}
            selectsStart
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none text-center"
          />

          <label
            htmlFor="endDate"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            End Date
          </label>
          <DatePicker
            id="endDate"
            selected={selectedEndDate}
            onChange={(date: Date) => setSelectedEndDate(date)}
            selectsEnd
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            minDate={selectedStartDate}
            disabled={!selectedStartDate}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none text-center"
          />
        </div>
      )}
    </div>
  );
};

export default FilterContainer;
