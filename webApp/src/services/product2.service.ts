import { IApiProduct } from "../interfaces/api/api-product.interface";
import { IDataRequest } from "../interfaces/api/api-dataobject.interface"
// import { request, gql } from 'graphql-request'
import { Auth } from "aws-amplify"
import { GraphQLClient, gql } from 'graphql-request'
import { IApiNutritionValues } from "../interfaces/api/api-nutritionValues.interface";

const endpoint = "/graphql";
const client = new GraphQLClient(endpoint)

const getProduct = async (id: number): Promise<{ product: IApiProduct }> => {
  const query = gql`
  {
    products(id: $id) {
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
        expirationDate
      }
      nutritionalValue {
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
  }
  `

  const variables = {
    id
  }

  var request = client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })
  return request;
};

const getProducts = async (): Promise<{ products: IApiProduct[] }> => {
  const query = gql`
  {
    products {
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
        expirationDate
      }
      nutritionalValue {
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
  }
  `

  const variables = {

  }

  var request = client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })
  return request;
};

const addProduct = async (product: IApiProduct): Promise<{ createProduct: IApiProduct }> => {
  const query = gql`
  mutation AddProduct($createProduct: createProductInput!) {
    createProduct(input: $createProduct) {
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
        expirationDate
      }
      nutritionalValue {
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
  }
  `

  const variables = {
    createProduct: {
      name: product.name,
      iconPath: product.iconPath,
      categoryIds: product.category ? product.category.map(category => category.id) : [],
      totalQuantity: product.totalQuantity,
      minQuantity: product.minQuantity,
      unitDefaultQuantity: product.unitDefaultQuantity,
      unit: product.unit,
      itemInputs: product.items ? product.items.map(item => ({ barcode: item.barcode, expirationDate: item.expirationDate })) : [],
      nutritionalValueInput: product.nutritionalValue
    }
  }

  return client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })
};

const updateProduct = async (product: IApiProduct): Promise<{ updateProduct: IApiProduct }> => {
  const query = gql`
  mutation UpdateProduct($updateProduct: updateProductInput!) {
    updateProduct(input: $updateProduct) {
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
        expirationDate
      }
      nutritionalValue {
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
  }
  `

  const variables = {
    updateProduct: {
      id: product.id,
      name: product.name,
      iconPath: product.iconPath,
      categoryIds: product.category ? product.category.map(category => category.id) : [],
      totalQuantity: product.totalQuantity,
      minQuantity: product.minQuantity,
      unitDefaultQuantity: product.unitDefaultQuantity,
      unit: product.unit,
      itemInputs: product.items ? product.items.map(item => ({ barcode: item.barcode, expirationDate: item.expirationDate })) : [],
      nutritionalValueInput: product.nutritionalValue
    }
  }

  return client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })
};

const deleteProduct = async (id: number) => {
  const query = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
  `

  const variables = {
    id
  }

  return client.request(query, variables, { authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` })
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
