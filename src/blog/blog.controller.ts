//all the necessary modules to handle HTTP requests using NestJS
import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
  Query,
  Delete,
} from '@nestjs/common';

import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';
/** Controllers recieve incoming HTTPS requests, this is how we will send data from DB to frontend */
@Controller('blog')
export class BlogController {
  //dependency injection
  constructor(private blogService: BlogService) {}
  // submitting a new post
  @Post('/post')
  async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    const newPost = await this.blogService.addPost(createPostDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully',
      post: newPost,
    });
  }
  //getting a post by a specific id
  @Get('/post/:postID')
  async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
    const post = await this.blogService.getPost(postID);
    if (!post) {
      throw new NotFoundException('Post does not exist, try again!');
    }
    return res.status(HttpStatus.OK).json(post);
  }
  //get all the posts in the DB
  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.blogService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }
  //editing a post by postID, accepts a query parameter of postID and will carry out the functionality of updating a single post
  @Put('edit')
  async editPost(
    @Res() res,
    @Query('postID', new ValidateObjectId()) postID,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    const editedPost = await this.blogService.editPost(postID, createPostDTO);
    if (!editedPost) {
      throw new NotFoundException('Post does not exist, cannot be edited');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully edited',
      post: editedPost,
    });
  }
  //deleting a post by its ID, accepts a query parameter of postID and will delete a particular post from the database
  @Delete('/delete')
  async deletePost(
    @Res() res,
    @Query('postID', new ValidateObjectId()) postID,
  ) {
    const deletedPost = await this.blogService.deletePost(postID);
    if (!deletedPost) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted!',
      post: deletedPost,
    });
  }
}
