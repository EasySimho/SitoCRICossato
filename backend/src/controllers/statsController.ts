import { Request, Response } from 'express';
import Stat, { IStat } from '../models/Stat';
import { Error as MongooseError } from 'mongoose';
import path from 'path';
import fs from 'fs';

// Get all stats
export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await Stat.find().sort({ createdAt: -1 });
    // Convert image paths to full URLs
    const statsWithFullImagePaths = stats.map(item => ({
      ...item.toObject(),
      image: item.image ? `${process.env.BASE_URL}${item.image}` : null
    }));
    res.json(statsWithFullImagePaths);
  } catch (error: unknown) {
    console.error('Error in getStats:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching stats', error: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching stats', error: 'Unknown error occurred' });
    }
  }
};

// Get single stat
export const getStatById = async (req: Request, res: Response) => {
  try {
    const stat = await Stat.findById(req.params.id);
    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }
    // Convert image path to full URL
    const statWithFullImagePath = {
      ...stat.toObject(),
      image: stat.image ? `${process.env.BASE_URL}${stat.image}` : null
    };
    res.json(statWithFullImagePath);
  } catch (error: unknown) {
    console.error('Error in getStatById:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching stat', error: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching stat', error: 'Unknown error occurred' });
    }
  }
};

// Create stat
export const createStat = async (req: Request, res: Response) => {
  try {
    console.log('Received stat data:', req.body);
    console.log('Received file:', req.file);

    const statData = {
      title: req.body.title,
      value: Number(req.body.value),
      description: req.body.description,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image
    };

    console.log('Processed stat data:', statData);

    const stat = new Stat(statData);
    await stat.save();
    
    // Convert image path to full URL
    const statWithFullImagePath = {
      ...stat.toObject(),
      image: stat.image ? `${process.env.BASE_URL}${stat.image}` : null
    };
    
    console.log('Saved stat:', statWithFullImagePath);
    res.status(201).json(statWithFullImagePath);
  } catch (error: unknown) {
    console.error('Error in createStat:', error);
    if (error instanceof MongooseError.ValidationError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    if (error instanceof Error) {
      res.status(400).json({ message: 'Error creating stat', error: error.message });
    } else {
      res.status(400).json({ message: 'Error creating stat', error: 'Unknown error occurred' });
    }
  }
};

// Update stat
export const updateStat = async (req: Request, res: Response) => {
  try {
    console.log('Updating stat with ID:', req.params.id);
    console.log('Update data:', req.body);
    console.log('Update file:', req.file);

    // Se c'è un nuovo file, elimina il vecchio
    if (req.file) {
      const oldStat = await Stat.findById(req.params.id);
      if (oldStat?.image) {
        const oldImagePath = path.join(__dirname, '../../uploads', path.basename(oldStat.image));
        try {
          fs.unlinkSync(oldImagePath);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
    }

    const updateData = {
      ...req.body,
      value: Number(req.body.value),
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image
    };

    const stat = await Stat.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }

    // Convert image path to full URL
    const statWithFullImagePath = {
      ...stat.toObject(),
      image: stat.image ? `${process.env.BASE_URL}${stat.image}` : null
    };

    console.log('Updated stat:', statWithFullImagePath);
    res.json(statWithFullImagePath);
  } catch (error: unknown) {
    console.error('Error in updateStat:', error);
    if (error instanceof MongooseError.ValidationError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    if (error instanceof Error) {
      res.status(400).json({ message: 'Error updating stat', error: error.message });
    } else {
      res.status(400).json({ message: 'Error updating stat', error: 'Unknown error occurred' });
    }
  }
};

// Delete stat
export const deleteStat = async (req: Request, res: Response) => {
  try {
    const stat = await Stat.findById(req.params.id);
    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }

    // Elimina il file dell'immagine se esiste
    if (stat.image) {
      const imagePath = path.join(__dirname, '../../uploads', path.basename(stat.image));
      try {
        fs.unlinkSync(imagePath);
        console.log('Image file deleted:', imagePath);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    // Elimina la statistica dal database
    await Stat.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stat deleted successfully' });
  } catch (error: unknown) {
    console.error('Error in deleteStat:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error deleting stat', error: error.message });
    } else {
      res.status(500).json({ message: 'Error deleting stat', error: 'Unknown error occurred' });
    }
  }
}; 