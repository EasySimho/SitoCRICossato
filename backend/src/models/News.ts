import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  content: string;
  image: string;
  date: Date;
  author: string;
  category: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Eventi', 'Comunicati', 'Notizie'],
      message: 'Category must be one of: Eventi, Comunicati, Notizie'
    }
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  }
}, {
  timestamps: true
});

export default mongoose.model<INews>('News', newsSchema); 