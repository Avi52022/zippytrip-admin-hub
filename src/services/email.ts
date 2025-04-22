import { toast } from "@/hooks/use-toast";

export interface EmailNotification {
  to: string;
  subject: string;
  body: string;
}

// Dummy email service that simulates sending emails
export const sendEmail = async (notification: EmailNotification): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Sending email:', notification);
  
  // For testing, always return success and show a toast
  toast({
    title: "Email Sent Successfully",
    description: `Email sent to ${notification.to}`,
  });
  
  return true;
};