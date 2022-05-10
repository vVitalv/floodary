import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: [String],
      default: ['user']
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamp: true
  }
)

userSchema.pre('save', async (next) => {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = 10
  this.password = bcrypt.hashSync(this.password, salt)
  return next()
})

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser({ login, password }) {
    if (!login) {
      throw new Error('Username is required')
    }
    if (!password) {
      throw new Error('Password is required')
    }

    const user = await this.findOne({ login }).exec()

    if (!user) {
      throw new Error('User not found')
    }

    const isPasswordOk = await user.passwordMatches(password)

    if (!isPasswordOk) {
      throw new Error('Password incorrect')
    }

    return user
  }
}

export default mongoose.model('users', userSchema)
