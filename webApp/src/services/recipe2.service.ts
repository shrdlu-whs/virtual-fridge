import { IApiRecipe } from "../interfaces/api/api-recipe.interface";
import { IDataRequest } from "../interfaces/api/api-dataobject.interface"
// import { request, gql } from 'graphql-request'
import { Auth } from "aws-amplify"
import { GraphQLClient, gql } from 'graphql-request'

const endpoint = "/graphql";
const client = new GraphQLClient(endpoint)

const getRecipe = async (id: number): Promise<{ recipe: IApiRecipe }> => {
  const query = gql`
  query getRecipe($id: Long!)
  {
    recipes(id: $id) {
      id
      name
      shortDescription
      instructions
      iconPath
      recipeItems {
        id
        quantity
        product {
          id
          name
          unit
          totalQuantity 
        }
      }
      hyperlink
      favorite
      expectedTime
      difficulty
      # created
    }
  }
  `

  const variables = {
    id
  }

  var request = client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })
  return request;
};

const getRecipes = async (): Promise<{ recipes: IApiRecipe[] }> => {
  const query = gql`
  {
    recipes {
      id
      name
      shortDescription
      instructions
      iconPath
      recipeItems {
        id
        quantity
        product {
          id
          name
          unit
          totalQuantity 
        }
      }
      hyperlink
      favorite
      expectedTime
      difficulty
      # created
    }
  }
  `

  const variables = {

  }

  var request = client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })
  return request;
};

const addRecipe = async (recipe: IApiRecipe): Promise<{ createRecipe: IApiRecipe }> => {
  const query = gql`
  mutation AddRecipe($createRecipe: createRecipeInput!) {
    createRecipe(input: $createRecipe) {
      id
      name
      shortDescription
      instructions
      iconPath
      recipeItems {
        id
        quantity
        product {
          id
          name
          unit
          totalQuantity 
        }
      }
      hyperlink
      favorite
      expectedTime
      difficulty
      # created
    }
  }
  `

  const variables = {
    createRecipe: {
      name: recipe.name,
      shortDescription: recipe.shortDescription,
      instructions: recipe.instructions,
      iconPath: recipe.iconPath,
      recipeItemInputs: recipe.recipeItems.map((item) => ({ productId: item.product.id, quantity: item.quantity })),
      hyperlink: recipe.hyperlink,
      favorite: recipe.favorite,
      expectedTime: recipe.expectedTime,
      difficulty: recipe.difficulty,
    }
  }

  return client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })
};

const updateRecipe = async (recipe: IApiRecipe): Promise<{ updateRecipe: IApiRecipe }> => {
  const query = gql`
  mutation UpdateProduct($updateRecipe: updateRecipeInput!) {
    updateRecipe(input: $updateRecipe) {
      id
      name
      shortDescription
      instructions
      iconPath
      recipeItems {
        id
        quantity
        product {
          id
          name
          unit
          totalQuantity 
        }
      }
      hyperlink
      favorite
      expectedTime
      difficulty
      # created
    }
  }
  `

  const variables = {
    updateRecipe: {
      id: recipe.id,
      name: recipe.name,
      shortDescription: recipe.shortDescription,
      instructions: recipe.instructions,
      iconPath: recipe.iconPath,
      recipeItemInputs: recipe.recipeItems.map((item) => ({ id: item.id, productId: item.product.id, quantity: item.quantity })),
      hyperlink: recipe.hyperlink,
      favorite: recipe.favorite,
      expectedTime: recipe.expectedTime,
      difficulty: recipe.difficulty,
    }
  }

  return client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` });
}

const deleteRecipe = async (id: number) => {
  const query = gql`
  mutation DeleteRecipe($id: Long!) {
    deleteRecipe(id: $id)
  }
  `

  const variables = {
    id
  }

  return client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })

};

export { getRecipes, getRecipe, addRecipe, updateRecipe, deleteRecipe };
