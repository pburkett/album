import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import ImageSchema from '../models/Image'
class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Imageslandscape = mongoose.model('Image', ImageSchema, 'imageslandscape');
  Imagesportrait = mongoose.model('Image', ImageSchema, 'imagesportrait');
}

export const dbContext = new DbContext()
