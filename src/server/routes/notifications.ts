import express, { Request, Response } from 'express';
import { sendTripNotification } from '../../services/api/notifications';  // Fix the import path

const router = express.Router();

router.post('/trip-notification', async (req: Request, res: Response) => {
  try {
    const { email, type, tripDetails } = req.body;
    await sendTripNotification(email, type, tripDetails);
    res.json({ success: true, message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: 'Failed to send notification' });
  }
});

export default router;