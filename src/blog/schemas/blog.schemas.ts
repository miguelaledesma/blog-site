import * as mongoose from 'mongoose';

//Creating the database schema for the blog post,  datatype of data that will be stored in the database will be properly controlled

export const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  body: String,
  author: String,
  date_posted: String,
});
