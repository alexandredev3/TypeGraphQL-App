import { ObjectType, Field } from 'type-graphql';

import Posts from '../../posts/types/post-type';

@ObjectType()
class UserPosts {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  bio: string;

  @Field(type => [Posts], {
    nullable: true
  })
  posts: Posts[];
}

export default UserPosts;