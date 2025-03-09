import React, { useEffect } from "react";
import ReminderList from "./components/ReminderList";
import { scheduleReminderNotifications } from "./components/NotificationService";

const App = () => {
  useEffect(() => {
    if (Notification.permission === "granted") {
      scheduleReminderNotifications();
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          scheduleReminderNotifications();
        }
      });
    }
  }, []); // ✅ Empty dependency array ensures it runs only once

  return (
    <div>
      <h1>CRM Reminder System</h1>
      <ReminderList />
    </div>
  );
};

export default App;
