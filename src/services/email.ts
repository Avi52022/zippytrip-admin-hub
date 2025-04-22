
// Browser-compatible email service simulation
export interface EmailNotification {
  to: string;
  subject: string;
  body: string;
}

// This is a browser-compatible mock implementation that logs emails instead of sending them
export const sendEmail = async (notification: EmailNotification): Promise<boolean> => {
  console.log('Email notification would be sent in production:');
  console.log('To:', notification.to);
  console.log('Subject:', notification.subject);
  console.log('Body:', notification.body);
  
  // In a real implementation, this would use an API call to a server endpoint
  // For now, we're simulating a successful send
  return Promise.resolve(true);
};
