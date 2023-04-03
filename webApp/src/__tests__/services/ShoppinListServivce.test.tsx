import * as ShoppingListApi from '../../services/shoppingList.service';
import { RootStore } from "../../store/rootStore";
import axios, { CancelToken } from 'axios';
import { IApiShoppingList} from '../../interfaces/api/api-shoppinglist.interface';
import { Done } from '@material-ui/icons';

const shoppingListService = require('../../services/shoppingList.service');

test('forgotPassword exists',() => {
    expect(typeof shoppingListService).toEqual('object');
})

let token: CancelToken;
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('should fetch shoppinglists',async() => {
  const shoppingLists: IApiShoppingList[] = [{
    id: 4,
    name: "Shopping",
    items: [],
    created: new Date("2021-02-14T15:27:16.098Z")
  },
  {
    id: 5,
    name: "Netto",
    items: [],
    created: new Date("2021-02-14T15:27:16.098Z")
  }
]; 
  const resp = {data: shoppingLists};
  mockedAxios.get.mockImplementation(() => Promise.resolve(resp));
 const data = await ShoppingListApi.getShoppingLists(token);
 expect(data.data).toEqual(shoppingLists);
});

