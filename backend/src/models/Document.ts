import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  category: string;
  fileUrl: string;
  fileSize: string;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileSize: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IDocument>('Document', DocumentSchema); 