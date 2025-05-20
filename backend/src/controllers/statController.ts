import { Request, Response } from 'express';
import Stat, { IStat } from '../models/Stat';
import { Error as MongooseError } from 'mongoose';

// Get all stats
export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await Stat.find().sort({ createdAt: -1 });
    res.json(stats);
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
    res.json(stat);
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

    const statData = {
      title: req.body.title,
      value: req.body.value,
      description: req.body.description
    };

    console.log('Processed stat data:', statData);

    const stat = new Stat(statData);
    await stat.save();
    
    console.log('Saved stat:', stat);
    res.status(201).json(stat);
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

    const updateData = {
      title: req.body.title,
      value: req.body.value,
      description: req.body.description
    };

    const stat = await Stat.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }

    console.log('Updated stat:', stat);
    res.json(stat);
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