// src/data.js
export const reminders = [
  {
    leadId: "67c5bba9b9de4f2c6358de25",
    module: "lead",
    leadMetaDetails: {
      leadName: "John Doe",
      status: "Interested",
      phoneno: "9815627365",
    },
    reminderDateTime: new Date(Date.now() + 60000).toISOString(), // Upcoming 1 min
    reminderMessage: "Follow up with John",
    reminderSetOn: new Date().toISOString(),
    _id: "67ca8bc0d7d5851fa1979db4",
  },
  {
    leadId: "67c963feed6df9cd3ed2dbd6",
    module: "lead",
    leadMetaDetails: {
      leadName: "Robert Lee",
      status: "Pending",
      phoneno: "9815627365",
    },
    reminderDateTime: new Date(Date.now() + 300000).toISOString(), // Upcoming 2 min
    reminderMessage: "Call Jane for an update",
    reminderSetOn: new Date().toISOString(),
    _id: "67ca8bc0d7d5851fa1979db5",
  },
];
