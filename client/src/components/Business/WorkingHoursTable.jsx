import React from "react";
import { Table } from "react-bootstrap";

const WorkingHoursTable = ({ weekData }) => {
  console.log("Data=", weekData);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const hoursOfDay = Array.from(
    { length: weekData.Sunday.length },
    (_, i) => `${i + 9}:00  `
  );

  return (
    <Table bordered>
      <thead>
        <tr>
          <th></th>
          {hoursOfDay.map((hour, index) => (
            <th key={index}>{hour}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {daysOfWeek.map((day, index) => (
          <tr key={index}>
            <td>{day}</td>
            {weekData[day].map((available, index) => (
              <td
                key={index}
                style={{
                  backgroundColor: available ? "lightgreen" : "lightgrey",
                }}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default WorkingHoursTable;
