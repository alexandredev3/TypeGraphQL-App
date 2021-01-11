import { Resolver, Mutation, Ctx, Authorized, Arg, Query } from 'type-graphql';

import PostInput from '../inputs/post-input';
import Post from '../types/post-type';

import GraphqlContext from '../../../context/GraphqlContext';

@Resolver(Post)
class PostResolvers {
  @Query(() => [Post])
  @Authorized()
  async posts(
    @Ctx() { prisma }: GraphqlContext
  ) {
    const posts = await prisma.post.findMany();

    return posts;
  }

  @Mutation(() => Post)
  @Authorized()
  async createPost(
    @Ctx() { prisma, payload }: GraphqlContext,
    @Arg('userArgs') postArgs: PostInput
  ) {
    const { 
      title,
      description
    } = postArgs;

    const { id } = payload;

    const post = await prisma.post.create({
      data: {
        title,
        description,
        authorId: id
      }
    });

    return post;
  }

}

export default PostResolvers;