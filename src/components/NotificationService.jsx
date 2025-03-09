// src/components/NotificationService.js
import { reminders } from "../data";

const scheduledNotifications = new Set(); // Stores scheduled reminder IDs

const scheduleReminderNotifications = () => {
  reminders.forEach((reminder) => {
    if (scheduledNotifications.has(reminder._id)) return; // Skip if already scheduled

    const reminderTime = new Date(reminder.reminderDateTime).getTime();
    const currentTime = Date.now();
    const timeDiff = reminderTime - currentTime;

    if (timeDiff > 0) {
      scheduledNotifications.add(reminder._id);
      setTimeout(() => {
        showNotification(reminder);
        scheduledNotifications.delete(reminder._id); // Remove after showing
      }, timeDiff);
    }
  });
};

const showNotification = (reminder) => {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification("🔔 Reminder Alert!", {
        body: `📝 ${reminder.leadMetaDetails.leadName}: ${reminder.reminderMessage}`,
        icon: "/logo512.png", // Small icon (app logo)
        image: "/reminder-banner.png", // Large banner image
        badge: "/badge-icon.png", // Small badge icon (for mobile)
        requireInteraction: true, // Keep notification visible until dismissed
        vibrate: [200, 100, 200], // Vibration pattern
        actions: [
          { action: "snooze", title: "⏳ Snooze" },
          { action: "dismiss", title: "❌ Dismiss" },
        ],
        data: {
          leadId: reminder.leadId,
          leadName: reminder.leadMetaDetails.leadName,
          reminderMessage: reminder.reminderMessage,
        },
      });
    });
  }
};

export { scheduleReminderNotifications };
