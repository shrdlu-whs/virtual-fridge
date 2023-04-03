import { IApiProduct } from "../../interfaces/api/api-product.interface";
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import schema from "../../graphql/product.schema"

test('forgotPassword exists', async () => {
  await getProducts()
})

const getProducts = async () => {
  var query = '{ hello }';
  
  graphql(schema, query).then((result) => {
    // Prints
    // {
    //   data: { hello: "world" }
    // }
    console.log(result);
  });
};

const getProduct = (id: number) => {
  
  

};

const addProduct = (product: IApiProduct) => {
 
  

};

const updateProduct = (product: IApiProduct) => {
 
  

};

const deleteProduct = (id: number) => {
 
  

};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
