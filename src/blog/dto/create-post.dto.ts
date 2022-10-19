export class CreatePostDTO {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly author: string;
  readonly date_posted: string;
}

/**marked each of the individual properties in the CreatePostDTO class to have a data type of string and as read-only to avoid unnecessary mutation. */
