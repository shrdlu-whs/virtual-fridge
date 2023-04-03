import { IAddShoppingList, IApiShoppingList, IUpdateShoppingList } from "../interfaces/api/api-shoppinglist.interface";
// import { request, gql } from 'graphql-request'
import { Auth } from "aws-amplify"
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = "/graphql";
const client = new GraphQLClient(endpoint)

const getShoppingList = async (id: number): Promise<{ shoppingList: IApiShoppingList }> => {
  const query = gql`
  query getShoppingList($id: Long!){
    shoppingList(id: $id) {
      id
      name
      shoppingListItems {
        id
        product {
            id
            name
            iconPath
            category {
              id
              name
            }
            totalQuantity
            minQuantity
            unitDefaultQuantity
            unit
            items {
              id
              barcode
              expirationDate
              created
            }
            nutritionalValue {
              id
              nutritionScore
              calories
              protein
              carbohydrates
              sugar
              fat
              saturatedFat
              fiber
              salt
            }
        }
        quantity
        isAcquired
      }
      created
    }
  }
  `

  const variables = {
    id
  }

  var request = client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })
  return request;
};

const getShoppingLists = async (): Promise<{ shoppingLists: IApiShoppingList[] }> => {
  const query = gql`
    {
        shoppingLists{
          id
          name
          shoppingListItems {
            id
            product {
                id
            }
            quantity
            isAcquired
          }
          # created
      }
  }
  `

  const variables = {

  }

  var request = client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })
  return request;
};

const addShoppingList = async (shoppingList: IAddShoppingList): Promise<{ createShoppingList: IAddShoppingList }> => {
  console.log(shoppingList);
  const query = gql`
 mutation AddShoppingList ($createShoppingList: createShoppingListInput!) {
      createShoppingList(input: $createShoppingList) {
        id
        name
        shoppingListItems {
          id
          product {
              id 
            }
        quantity
        isAcquired
       }
        # created
      }
  }
  `

  const variables = {
    createShoppingList: {
      name: shoppingList.name,
      shoppingListItemInputs: shoppingList.shoppingListItems.map((item) => ({ productId: item.product.id, quantity: item.quantity, isAcquired: item.isAcquired }))
    }
  }

  return client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })
};

const updateShoppingList = async (shoppingList: IUpdateShoppingList): Promise<{ updateShoppingList: IUpdateShoppingList }> => {

  const query = gql`
  mutation UpdateShoppingList ($updateShoppingList: updateShoppingListInput!) {
      updateShoppingList(input: $updateShoppingList) {
        id
        name
        shoppingListItems {
          id
          product {
              id
          }
          quantity
          isAcquired
        }
          # created
      }
  }
  `
  const variables = {
    updateShoppingList: {
      id: shoppingList.id,
      name: shoppingList.name,
      shoppingListItemInputs: shoppingList.shoppingListItems.map((item) => ({ productId: item.product.id, quantity: item.quantity, isAcquired: item.isAcquired }))
    }
  }

  return client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })


};

const deleteShoppingList = async (id: number) => {
  const query = gql`
  mutation DeleteShoppingList($id: Long!) {
    deleteShoppingList(id: $id) 
  }
  `
  const variables = {
    id
  }

  return client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })



};

export { getShoppingList, getShoppingLists, addShoppingList, updateShoppingList, deleteShoppingList };
