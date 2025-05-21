import { Request, Response } from 'express';
import News, { INews } from '../models/News';
import { Error as MongooseError } from 'mongoose';
import path from 'path';
import fs from 'fs';

// Get all news
export const getNews = async (req: Request, res: Response) => {
  try {
    const news = await News.find().sort({ date: -1 });
    // Convert image paths to full URLs
    const newsWithFullImagePaths = news.map(item => ({
      ...item.toObject(),
      image: item.image ? `${process.env.BASE_URL}${item.image}` : null
    }));
    res.json(newsWithFullImagePaths);
  } catch (error: unknown) {
    console.error('Error in getNews:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching news', error: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching news', error: 'Unknown error occurred' });
    }
  }
};

// Get single news
export const getNewsById = async (req: Request, res: Response) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    // Convert image path to full URL
    const newsWithFullImagePath = {
      ...news.toObject(),
      image: news.image ? `${process.env.BASE_URL}${news.image}` : null
    };
    res.json(newsWithFullImagePath);
  } catch (error: unknown) {
    console.error('Error in getNewsById:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching news', error: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching news', error: 'Unknown error occurred' });
    }
  }
};

// Create news
export const createNews = async (req: Request, res: Response) => {
  try {
    console.log('Received news data:', req.body);
    console.log('Received file:', req.file);

    const newsData = {
      title: req.body.title,
      content: req.body.content,
      date: new Date(req.body.date),
      author: req.body.author,
      category: req.body.category,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image,
      status: 'draft'
    };

    console.log('Processed news data:', newsData);

    const news = new News(newsData);
    await news.save();
    
    // Convert image path to full URL
    const newsWithFullImagePath = {
      ...news.toObject(),
      image: news.image ? `${process.env.BASE_URL}${news.image}` : null
    };
    
    console.log('Saved news:', newsWithFullImagePath);
    res.status(201).json(newsWithFullImagePath);
  } catch (error: unknown) {
    console.error('Error in createNews:', error);
    if (error instanceof MongooseError.ValidationError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    if (error instanceof Error) {
      res.status(400).json({ message: 'Error creating news', error: error.message });
    } else {
      res.status(400).json({ message: 'Error creating news', error: 'Unknown error occurred' });
    }
  }
};

// Update news
export const updateNews = async (req: Request, res: Response) => {
  try {
    console.log('Updating news with ID:', req.params.id);
    console.log('Update data:', req.body);
    console.log('Update file:', req.file);

    // Se c'è un nuovo file, elimina il vecchio
    if (req.file) {
      const oldNews = await News.findById(req.params.id);
      if (oldNews?.image) {
        const oldImagePath = path.join(__dirname, '../../uploads', path.basename(oldNews.image));
        try {
          fs.unlinkSync(oldImagePath);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
    }

    const updateData = {
      ...req.body,
      date: new Date(req.body.date),
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image
    };

    const news = await News.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    // Convert image path to full URL
    const newsWithFullImagePath = {
      ...news.toObject(),
      image: news.image ? `${process.env.BASE_URL}${news.image}` : null
    };

    console.log('Updated news:', newsWithFullImagePath);
    res.json(newsWithFullImagePath);
  } catch (error: unknown) {
    console.error('Error in updateNews:', error);
    if (error instanceof MongooseError.ValidationError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    if (error instanceof Error) {
      res.status(400).json({ message: 'Error updating news', error: error.message });
    } else {
      res.status(400).json({ message: 'Error updating news', error: 'Unknown error occurred' });
    }
  }
};

// Delete news
export const deleteNews = async (req: Request, res: Response) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    // Elimina il file dell'immagine se esiste
    if (news.image) {
      const imagePath = path.join(__dirname, '../../uploads', path.basename(news.image));
      try {
        fs.unlinkSync(imagePath);
        console.log('Image file deleted:', imagePath);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    // Elimina la notizia dal database
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted successfully' });
  } catch (error: unknown) {
    console.error('Error in deleteNews:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error deleting news', error: error.message });
    } else {
      res.status(500).json({ message: 'Error deleting news', error: 'Unknown error occurred' });
    }
  }
}; 