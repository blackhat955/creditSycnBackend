import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String, // URL or base64 string
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);
