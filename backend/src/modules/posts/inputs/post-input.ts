import { InputType, Field } from 'type-graphql';

@InputType()
class PostInput {

  @Field()
  title: string;

  @Field()
  description: string;

}

export default PostInput;