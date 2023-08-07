import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false // cuando se busque un userSchema que no se devuelva el password
  },
  fullname: {
    type: String,
    required: [true, 'Fullname is required'],
    minLength: [6, "Fullname must be at least 6 characters"],
    maxLength: [50, "Fullname must be at most 50 characters"]
  },
});

const User = models.User || model('User', userSchema);
export default User;