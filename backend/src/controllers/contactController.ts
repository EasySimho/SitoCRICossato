import { Request, Response } from 'express';
import Contact from '../models/Contact';

// Submit contact form
export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create new contact request
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      status: 'pending'
    });

    await contact.save();
    console.log('New contact request saved:', contact);

    res.status(201).json({
      message: 'Richiesta di contatto inviata con successo',
      contact
    });
  } catch (error) {
    console.error('Error in submitContact:', error);
    res.status(500).json({ message: 'Errore nell\'invio della richiesta di contatto' });
  }
};

// Get all contact requests (admin only)
export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error in getContacts:', error);
    res.status(500).json({ message: 'Error fetching contact requests' });
  }
};

// Get single contact request (admin only)
export const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact request not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Error in getContactById:', error);
    res.status(500).json({ message: 'Error fetching contact request' });
  }
};

// Update contact status (admin only)
export const updateContact = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Contact request not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Error in updateContact:', error);
    res.status(500).json({ message: 'Error updating contact request' });
  }
};

// Delete contact request (admin only)
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact request not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteContact:', error);
    res.status(500).json({ message: 'Error deleting contact request' });
  }
}; 