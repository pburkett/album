import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Image = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    img: { type: String, required: true },
    orientation: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Image.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Image
