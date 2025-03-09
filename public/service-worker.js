// public/service-worker.js
self.addEventListener("install", (event) => {
  console.log("Service Worker Installed");
  self.skipWaiting(); // 🔥 Forces activation immediately
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");
  event.waitUntil(self.clients.claim()); // 🔥 Take control immediately
});

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.text() : "Reminder Alert!";
  self.registration.showNotification("CRM Reminder", {
    body: data,
    icon: "/logo512.png",
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "snooze") {
    // ✅ Access flat object directly
    const reminder = event.notification.data;

    if (reminder) {
      const snoozeTime = 5 * 60 * 1000; // 5 minutes in milliseconds
      setTimeout(() => {
        self.registration.showNotification("🔔 Reminder Snoozed!", {
          body: `📝 ${reminder.leadName}: ${reminder.reminderMessage}`,
          icon: "/logo512.png",
          image: "/reminder-banner.png",
          badge: "/badge-icon.png",
          requireInteraction: true,
          vibrate: [200, 100, 200],
          actions: [
            { action: "snooze", title: "⏳ Snooze Again" },
            { action: "dismiss", title: "❌ Dismiss" },
          ],
          data: reminder, // ✅ Data passed correctly
        });
      }, snoozeTime);
    }
  } else if (event.action === "dismiss") {
    console.log("User dismissed the notification");
  } else {
    // ✅ Open lead details page using leadId
    const leadId = event.notification.data?.leadId;

    if (leadId) {
      const url = `http://localhost:3000/leads/${leadId}`; // ✅ Localhost URL
      event.waitUntil(
        clients
          .matchAll({ type: "window", includeUncontrolled: true })
          .then((clientList) => {
            for (const client of clientList) {
              if (client.url === url && "focus" in client) {
                return client.focus(); // Focus if already open
              }
            }
            if (clients.openWindow) {
              return clients.openWindow(url); // Open new tab if not open
            }
          })
      );
    }
  }
});
