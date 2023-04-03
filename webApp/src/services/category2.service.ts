import { IApiCategory } from "../interfaces/api/api-category.interface";
import { IDataRequest } from "../interfaces/api/api-dataobject.interface"
// import { request, gql } from 'graphql-request'
import { Auth } from "aws-amplify"
import { GraphQLClient, gql } from 'graphql-request'

const endpoint  = "/graphql";
const client = new GraphQLClient(endpoint)

const getCategories = async () : Promise<{ category : IApiCategory[] }> => {
  const query = gql`
  {
    category {
      id
      name
    }
  }
  `

  const variables = {
    
  }

  var request = client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })
  return request;
};

export { getCategories };
