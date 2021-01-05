import { ObjectType, Field } from 'type-graphql';

@ObjectType()
class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

export default User;