import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schemas';
import { AuthenticationMiddleware } from '../common/authentication.middleware';

/**MongooseModule.forFeature() method is used to define which models should be registered in the module. Without this, injecting the PostModel within the BlogService using @injectModel() decorator wouldn’t work */

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }])],
  providers: [BlogService],
  controllers: [BlogController],
})
//Authentication MiddleWare and private routes
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { method: RequestMethod.POST, path: '/blog/post' },
        { method: RequestMethod.PUT, path: '/blog/edit' },
        { method: RequestMethod.DELETE, path: '/blog/delete' },
      );
  }
}
