import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async getPost(postId): Promise<Post> {
    const post = await this.postModel.findById(postId).exec();
    return post;
  }
  async getPosts(): Promise<Post[]> {
    const allPosts = await this.postModel.find().exec();
    return allPosts;
  }
  async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
    const newPost = await new this.postModel(createPostDTO);
    return newPost.save();
  }
  async editPost(postId, createPostDTO: CreatePostDTO): Promise<Post> {
    const editedPost = await this.postModel.findByIdAndUpdate(
      postId,
      createPostDTO,
      { new: true },
    );
    return editedPost;
  }
  async deletePost(postId): Promise<Post> {
    const deletedPost = await this.postModel.findByIdAndRemove(postId);
    return deletedPost;
  }
}
