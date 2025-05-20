import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['social', 'education', 'health', 'other']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  }
}, {
  timestamps: true
});

export default mongoose.model<IProject>('Project', projectSchema); 