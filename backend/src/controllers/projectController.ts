import { Request, Response } from 'express';
import Project, { IProject } from '../models/Project';
import { Error as MongooseError } from 'mongoose';
import path from 'path';
import fs from 'fs';

// Get all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    // Convert image paths to full URLs
    const projectsWithFullImagePaths = projects.map(item => ({
      ...item.toObject(),
      image: item.image ? `${process.env.BASE_URL}${item.image}` : null
    }));
    res.json(projectsWithFullImagePaths);
  } catch (error: unknown) {
    console.error('Error in getProjects:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching projects', error: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching projects', error: 'Unknown error occurred' });
    }
  }
};

// Get single project
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    // Convert image path to full URL
    const projectWithFullImagePath = {
      ...project.toObject(),
      image: project.image ? `${process.env.BASE_URL}${project.image}` : null
    };
    res.json(projectWithFullImagePath);
  } catch (error: unknown) {
    console.error('Error in getProjectById:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching project', error: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching project', error: 'Unknown error occurred' });
    }
  }
};

// Create project
export const createProject = async (req: Request, res: Response) => {
  try {
    console.log('Received project data:', req.body);
    console.log('Received file:', req.file);

    const projectData = {
      title: req.body.title,
      description: req.body.description,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      category: req.body.category,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image
    };

    console.log('Processed project data:', projectData);

    const project = new Project(projectData);
    await project.save();
    
    // Convert image path to full URL
    const projectWithFullImagePath = {
      ...project.toObject(),
      image: project.image ? `${process.env.BASE_URL}${project.image}` : null
    };
    
    console.log('Saved project:', projectWithFullImagePath);
    res.status(201).json(projectWithFullImagePath);
  } catch (error: unknown) {
    console.error('Error in createProject:', error);
    if (error instanceof MongooseError.ValidationError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    if (error instanceof Error) {
      res.status(400).json({ message: 'Error creating project', error: error.message });
    } else {
      res.status(400).json({ message: 'Error creating project', error: 'Unknown error occurred' });
    }
  }
};

// Update project
export const updateProject = async (req: Request, res: Response) => {
  try {
    console.log('Updating project with ID:', req.params.id);
    console.log('Update data:', req.body);
    console.log('Update file:', req.file);

    // Se c'è un nuovo file, elimina il vecchio
    if (req.file) {
      const oldProject = await Project.findById(req.params.id);
      if (oldProject?.image) {
        const oldImagePath = path.join(__dirname, '../../uploads', path.basename(oldProject.image));
        try {
          fs.unlinkSync(oldImagePath);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
    }

    const updateData = {
      ...req.body,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image
    };

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Convert image path to full URL
    const projectWithFullImagePath = {
      ...project.toObject(),
      image: project.image ? `${process.env.BASE_URL}${project.image}` : null
    };

    console.log('Updated project:', projectWithFullImagePath);
    res.json(projectWithFullImagePath);
  } catch (error: unknown) {
    console.error('Error in updateProject:', error);
    if (error instanceof MongooseError.ValidationError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    if (error instanceof Error) {
      res.status(400).json({ message: 'Error updating project', error: error.message });
    } else {
      res.status(400).json({ message: 'Error updating project', error: 'Unknown error occurred' });
    }
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Elimina il file dell'immagine se esiste
    if (project.image) {
      const imagePath = path.join(__dirname, '../../uploads', path.basename(project.image));
      try {
        fs.unlinkSync(imagePath);
        console.log('Image file deleted:', imagePath);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    // Elimina il progetto dal database
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error: unknown) {
    console.error('Error in deleteProject:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error deleting project', error: error.message });
    } else {
      res.status(500).json({ message: 'Error deleting project', error: 'Unknown error occurred' });
    }
  }
}; 