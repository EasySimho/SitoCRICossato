import mongoose, { Schema, Document } from 'mongoose';

export interface IStat extends Document {
  title: string;
  value: string;
  description: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const statSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  value: {
    type: String,
    required: [true, 'Value is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  image: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IStat>('Stat', statSchema); 