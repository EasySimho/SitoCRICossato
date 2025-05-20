import { Request, Response } from 'express';
import Document, { IDocument } from '../models/Document';
import path from 'path';
import fs from 'fs';

// Get all documents
export const getDocuments = async (req: Request, res: Response) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    console.error('Error in getDocuments:', error);
    res.status(500).json({ message: 'Error fetching documents' });
  }
};

// Get single document
export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json(document);
  } catch (error) {
    console.error('Error in getDocumentById:', error);
    res.status(500).json({ message: 'Error fetching document' });
  }
};

// Create new document
export const createDocument = async (req: Request, res: Response) => {
  try {
    console.log('Received document upload request:', {
      body: req.body,
      file: req.file
    });

    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ message: 'Nessun file caricato' });
    }

    const fileSize = (req.file.size / (1024 * 1024)).toFixed(2) + ' MB';
    const fileUrl = `/uploads/${req.file.filename}`;

    console.log('Creating document with data:', {
      title: req.body.title,
      category: req.body.category,
      fileUrl,
      fileSize
    });

    const document = new Document({
      title: req.body.title,
      category: req.body.category,
      fileUrl,
      fileSize
    });

    await document.save();
    console.log('Document saved successfully:', document);
    res.status(201).json(document);
  } catch (error) {
    console.error('Error in createDocument:', error);
    // If there's an error, delete the uploaded file
    if (req.file) {
      const filePath = path.join(__dirname, '../../public/uploads', req.file.filename);
      console.log('Attempting to delete file:', filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('File deleted successfully');
      } else {
        console.log('File not found at path:', filePath);
      }
    }
    res.status(500).json({ message: 'Error creating document' });
  }
};

// Update document
export const updateDocument = async (req: Request, res: Response) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const updateData: Partial<IDocument> = {
      title: req.body.title,
      category: req.body.category
    };

    if (req.file) {
      // Delete old file
      const oldFilePath = path.join(__dirname, '../../public/uploads', path.basename(document.fileUrl));
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      // Update with new file
      updateData.fileUrl = `/uploads/${req.file.filename}`;
      updateData.fileSize = (req.file.size / (1024 * 1024)).toFixed(2) + ' MB';
    }

    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedDocument);
  } catch (error) {
    // If there's an error and a new file was uploaded, delete it
    if (req.file) {
      const filePath = path.join(__dirname, '../../public/uploads', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    console.error('Error in updateDocument:', error);
    res.status(500).json({ message: 'Error updating document' });
  }
};

// Delete document
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Delete file
    const filePath = path.join(__dirname, '../../public/uploads', path.basename(document.fileUrl));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Document.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteDocument:', error);
    res.status(500).json({ message: 'Error deleting document' });
  }
}; 