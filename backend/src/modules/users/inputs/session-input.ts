import { InputType, Field } from 'type-graphql';
import { IsString, IsEmail } from 'class-validator';

@InputType()
class SessionInput {

  @Field()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

}

export default SessionInput;