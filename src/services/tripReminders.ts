export interface TripReminder {
  id: string;
  bookingId: string;
  routeDetails: string;
  travelDate: string;
  passengerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  status: 'pending' | 'sent' | 'failed';
  actions: string[];
}

// Dummy data for trip reminders
export const dummyTripReminders: TripReminder[] = [
  {
    id: "TR001",
    bookingId: "BK123",
    routeDetails: "Delhi to Mumbai Express",
    travelDate: "2024-02-25",
    passengerInfo: {
      name: "John Doe",
      email: "avishekkadel45@gmail.com",
      phone: "+91 98765 43210"
    },
    status: "pending",
    actions: ["Send Reminder", "Cancel"]
  },
  {
    id: "TR002",
    bookingId: "BK124",
    routeDetails: "Bangalore to Chennai",
    travelDate: "2024-02-26",
    passengerInfo: {
      name: "Jane Smith",
      email: "avishekkadel45@gmail.com",
      phone: "+91 98765 43211"
    },
    status: "sent",
    actions: ["Resend", "Cancel"]
  },
  {
    id: "TR003",
    bookingId: "BK125",
    routeDetails: "Pune to Goa",
    travelDate: "2024-02-27",
    passengerInfo: {
      name: "Mike Johnson",
      email: "avishekkadel45@gmail.com",
      phone: "+91 98765 43212"
    },
    status: "failed",
    actions: ["Retry", "Cancel"]
  }
];

// Function to fetch trip reminders
export const fetchTripReminders = async (): Promise<TripReminder[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return dummyTripReminders;
};

import { sendTripNotification } from '@/services/api/notifications';

// Function to send a trip reminder
export const sendTripReminder = async (reminderId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const reminder = dummyTripReminders.find(r => r.id === reminderId);
  if (!reminder) return false;
  
  try {
    await sendTripNotification(
      reminder.passengerInfo.email,
      'reminder',
      {
        routeName: reminder.routeDetails,
        origin: reminder.routeDetails.split(' to ')[0],
        destination: reminder.routeDetails.split(' to ')[1],
        departureTime: reminder.travelDate,
        seatNumbers: []
      }
    );
    return true;
  } catch (error) {
    console.error('Failed to send trip reminder:', error);
    return false;
  }
};