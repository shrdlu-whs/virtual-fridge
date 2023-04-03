import * as RecipeApi from '../../services/recipe.service';
import { RootStore } from "../../store/rootStore";
import axios, { CancelToken } from 'axios';
import { IApiShoppingList} from '../../interfaces/api/api-shoppinglist.interface';
import { Done } from '@material-ui/icons';
import { Difficulty, IApiRecipe } from "../../interfaces/api/api-recipe.interface";
import { IRecipe } from '../../interfaces/froms/addRecipeForm.interface';

const recipeService = require('../../services//recipe.service');

test('forgotPassword exists',() => {
    expect(typeof recipeService).toEqual('object');
})

let token: CancelToken;
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('should fetch shoppinglists',async() => {
  const recipes: IRecipe[] = [{
    name: "",
    shortDescription: "",
    instructions: "",
    hyperlink: "https://www.someimage.net",
    expectedTime: "00:05:00",
    difficulty: "easy",
    recipeItems: []
  }
]; 
  const resp = {data: recipes};
  mockedAxios.get.mockImplementation(() => Promise.resolve(resp));
 const data = await RecipeApi.getRecipes(token);
 expect(data.data).toEqual(recipes);
});
