import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";

const ScheduleTable = ({ formData, setFormData }) => {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  // const initialSchedule = {
  //   Monday: new Array(timeSlots.length).fill(true),
  //   Tuesday: new Array(timeSlots.length).fill(true),
  //   Wednesday: new Array(timeSlots.length).fill(true),
  //   Thursday: new Array(timeSlots.length).fill(true),
  //   Friday: new Array(timeSlots.length).fill(true),
  //   Saturday: new Array(timeSlots.length).fill(true),
  //   Sunday: new Array(timeSlots.length).fill(true),
  // };

  // const [schedule, setSchedule] = useState(initialSchedule);

  const toggleCell = (day, index) => {
    const updatedOpeningHours = { ...formData.openingHours };
    updatedOpeningHours[day][index] = !updatedOpeningHours[day][index];
    //setSchedule(updatedOpeningHours);
    setFormData((prevData) => ({
      ...prevData,
      openingHours: updatedOpeningHours,
    }));
  };

  const toggleRow = (day) => {
    const updatedOpeningHours = { ...formData.openingHours };
    const allTrue = updatedOpeningHours[day].every((val) => val);
    updatedOpeningHours[day] = new Array(timeSlots.length).fill(!allTrue);
    //setSchedule(updatedOpeningHours);
    setFormData((prevData) => ({
      ...prevData,
      openingHours: updatedOpeningHours,
    }));
  };

  const toggleColumn = (index) => {
    const updatedOpeningHours = { ...formData.openingHours };
    const allTrue = weekDays.every((day) => updatedOpeningHours[day][index]);
    weekDays.forEach((day) => {
      updatedOpeningHours[day][index] = !allTrue;
    });
    // setSchedule(updatedOpeningHours);
    setFormData((prevData) => ({
      ...prevData,
      openingHours: updatedOpeningHours,
    }));
  };

  const getRowHeaderVariant = (day) => {
    const allTrue = formData.openingHours[day].every((val) => val);
    const allFalse = formData.openingHours[day].every((val) => !val);
    return allTrue ? "success" : allFalse ? "danger" : "warning";
  };

  const getColumnHeaderVariant = (index) => {
    const allTrue = weekDays.every((day) => formData.openingHours[day][index]);
    const allFalse = weekDays.every(
      (day) => !formData.openingHours[day][index]
    );
    return allTrue ? "success" : allFalse ? "danger" : "warning";
  };

  return (
    <Table bordered>
      <thead>
        <tr>
          <th></th>
          {timeSlots.map((slot, index) => (
            <th key={index}>
              <Button
                variant={getColumnHeaderVariant(index)}
                onClick={() => toggleColumn(index)}
              >
                {slot}
              </Button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weekDays.map((day, rowIndex) => (
          <tr key={rowIndex}>
            <td>
              <Button
                variant={getRowHeaderVariant(day)}
                onClick={() => toggleRow(day)}
              >
                {day}
              </Button>
            </td>
            {timeSlots.map((_, colIndex) => (
              <td key={colIndex}>
                <Button
                  variant={
                    formData.openingHours[day][colIndex] ? "success" : "danger"
                  }
                  onClick={() => toggleCell(day, colIndex)}
                >
                  {formData.openingHours[day][colIndex] ? (
                    <span className="material-symbols-outlined">check</span>
                  ) : (
                    <span className="material-symbols-outlined">close</span>
                  )}
                </Button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ScheduleTable;
