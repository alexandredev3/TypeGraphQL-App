import { Field, InputType } from 'type-graphql';

@InputType()
class UserType {
  @Field()
  name: string;

  @Field({ defaultValue: '' })
  bio: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

export default UserType;