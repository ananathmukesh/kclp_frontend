import React, { useState } from 'react';

const Calendars = () => {
  // Get current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  // Months array
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Years range (adjust as needed)
  const startYear = 1990;
  const endYear = 2100;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  // Get number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // State for selected day, month, and year
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
   

  console.log(`${selectedDay}-${selectedMonth}-${selectedYear}`);
  // Event handler for day selection change
  const handleDayChange = (event) => {
    setSelectedDay(parseInt(event.target.value));
  };

  // Event handler for month selection change
  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value) + 1);
  };

  // Event handler for year selection change
  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  // Generate days array based on selected month and year
  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  return (
    <div>
      <select value={selectedDay} onChange={handleDayChange}>
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
      <select value={selectedYear} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      {/* You can render your calendar component here using selectedDay, selectedMonth, and selectedYear */}
    </div>
  );
};

export default Calendars;

