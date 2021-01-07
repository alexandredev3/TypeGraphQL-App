import { ObjectType, Field } from 'type-graphql';

@ObjectType()
class Session {

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  token: string;

}

export default Session;