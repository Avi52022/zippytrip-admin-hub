import nodemailer from 'nodemailer';

// Configure email transporter
const transporter = nodemailer.createTransport({
  // Configure your email service here
  // Example for Gmail:
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendTripNotification = async (
  email: string,
  type: 'reminder' | 'delay' | 'cancellation',
  tripDetails: {
    routeName: string,
    origin: string,
    destination: string,
    departureTime: string,
    seatNumbers: string[]
  }
) => {
  const subjects = {
    reminder: 'Reminder: Your Upcoming Bus Trip',
    delay: 'Important: Your Bus Trip Has Been Delayed',
    cancellation: 'Notice: Your Bus Trip Has Been Cancelled'
  };

  const messages = {
    reminder: `
      Dear Passenger,
      
      This is a reminder for your upcoming bus trip:
      Route: ${tripDetails.routeName}
      From: ${tripDetails.origin}
      To: ${tripDetails.destination}
      Departure: ${new Date(tripDetails.departureTime).toLocaleString()}
      Seat(s): ${tripDetails.seatNumbers.join(', ')}
      
      Please arrive at least 30 minutes before departure.
      
      Safe travels!
      ZippyTrip Team
    `,
    delay: `
      Dear Passenger,
      
      We regret to inform you that your bus trip has been delayed:
      Route: ${tripDetails.routeName}
      From: ${tripDetails.origin}
      To: ${tripDetails.destination}
      Original Departure: ${new Date(tripDetails.departureTime).toLocaleString()}
      
      We will notify you of the new departure time shortly.
      We apologize for any inconvenience caused.
      
      ZippyTrip Team
    `,
    cancellation: `
      Dear Passenger,
      
      We regret to inform you that your bus trip has been cancelled:
      Route: ${tripDetails.routeName}
      From: ${tripDetails.origin}
      To: ${tripDetails.destination}
      Original Departure: ${new Date(tripDetails.departureTime).toLocaleString()}
      
      Our customer service team will contact you regarding refund procedures.
      We sincerely apologize for any inconvenience caused.
      
      ZippyTrip Team
    `
  };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subjects[type],
    text: messages[type]
  };

  return transporter.sendMail(mailOptions);
};