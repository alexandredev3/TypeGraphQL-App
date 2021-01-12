import { InputType, Field } from 'type-graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
class PostInput {

  @Field()
  @IsString()
  @MaxLength(80)
  title: string;

  @Field()
  @IsString()
  @MaxLength(300)
  description: string;

}

export default PostInput;