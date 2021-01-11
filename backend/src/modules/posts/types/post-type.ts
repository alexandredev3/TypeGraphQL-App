import { ObjectType, Field } from 'type-graphql';

import User from '../../users/types/user-type';

@ObjectType()
class Post {

  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({
    defaultValue: false
  })
  published: boolean;

  @Field()
  author: User;

}

export default Post;