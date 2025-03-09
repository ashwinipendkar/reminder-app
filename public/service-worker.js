// public/service-worker.js
self.addEventListener("install", () => {
  console.log("Service Worker Installed");
});

self.addEventListener("activate", () => {
  console.log("Service Worker Activated");
});

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.text() : "Reminder Alert!";
  self.registration.showNotification("CRM Reminder", {
    body: data,
    icon: "/logo512.png",
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification

  if (event.action === "snooze") {
    console.log("User clicked Snooze");
    // Implement snooze logic (e.g., show notification after 5 min)
  } else if (event.action === "dismiss") {
    console.log("User dismissed the notification");
  } else {
    // Handle default click (open CRM dashboard or lead details)
    event.waitUntil(clients.openWindow("https://your-crm-dashboard.com"));
  }
});
