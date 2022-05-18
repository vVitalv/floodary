import mongoose from 'mongoose'

const messageScheme = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  date: Number
})

export default mongoose.model('messages', messageScheme)
