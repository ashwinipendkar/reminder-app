// src/components/ReminderList.js
import React from "react";
import { reminders } from "../data";

const ReminderList = () => {
  return (
    <div>
      <h2>Upcoming Reminders</h2>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder._id}>
            <strong>{reminder.leadMetaDetails.leadName}</strong> -{" "}
            {reminder.reminderMessage}
            <br />
            <small>
              Reminder Time:{" "}
              {new Date(reminder.reminderDateTime).toLocaleTimeString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderList;
