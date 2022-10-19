import { Document } from 'mongoose';

/**successfully defined the types of data for a Post type as string values. */

export interface Post extends Document {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly author: string;
  readonly date_posted: string;
}
