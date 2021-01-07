import { ObjectType, Field } from 'type-graphql';

@ObjectType()
class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  bio: string;
}

export default User;