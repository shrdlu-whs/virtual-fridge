import React from "react";
import { inject, observer } from "mobx-react";
import { UiStateStore } from "../../store/uiStateStore";
import { ProductStore } from "../../store/productStore";
import { RecipeStore } from "../../store/recipeStore";
import RecipeCards from "./recipeCards/recipeCards";
import { IApiRecipe } from "../../interfaces/api/api-recipe.interface";
import AddRecipeForm from "./addRecipeForm/addRecipeForm";
import { IRecipe } from "../../interfaces/froms/addRecipeForm.interface";
import { Grid } from "@material-ui/core";
import { useStyles } from "./recipeContainer.styles";
import IRecipeView from "./recipeView/recipeView";

interface IRecipeContainerProps {
  uiStateStore?: UiStateStore;
  productStore?: ProductStore;
  recipeStore?: RecipeStore;
}

const RecipesContainer = ({ uiStateStore, productStore, recipeStore }: IRecipeContainerProps) => {
  const classes = useStyles();

  React.useEffect(() => {
    recipeStore!.getRecipes();
  }, []);

  //#region Add product dialog
  const handleOpenRecipeForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    productStore!.getProducts().then(() => uiStateStore!.setRecipeFormOpen(true));
  };

  const handleAddRecipe = (recipe: IApiRecipe) => {
    recipeStore!.addRecipe(recipe).then(() => uiStateStore!.setRecipeFormOpen(false));
  };

  const handleAddRecipeCancel = () => {
    uiStateStore!.setRecipeFormOpen(false);
  };
  //#endregion

  const handleUpdateRecipe = (recipe: IApiRecipe) => {
    recipeStore!.updateRecipe(recipe);
  };

  const handleDeleteRecipe = (id: number) => {
    recipeStore!.deleteRecipe(id);
  };

  const handleShowRecipe = (recipe: IApiRecipe) => {
    recipeStore!.resetAddRecipeFormData();
    uiStateStore!.setRecipeViewOpen(true);
    recipeStore!.setActiveRecipe(recipe);
  };

  const handleReturnToOverview = () => {
    uiStateStore!.setRecipeViewOpen(false);
  }

  return (
    <>
      {uiStateStore!.isRecipeViewOpen ? (
        <IRecipeView handleReturnToOverview={handleReturnToOverview}/>
      ) : uiStateStore!.isRecipeFormOpen ? (
        <AddRecipeForm
          isSubmitting={uiStateStore!.isSubmitting}
          isMobile={uiStateStore!.isMobile}
          handleAddRecipe={handleAddRecipe}
          handleAddRecipeCancel={handleAddRecipeCancel}
        />
      ) : (
        <RecipeCards
          handleAddRecipe={handleOpenRecipeForm}
          handleDeleteRecipe={handleDeleteRecipe}
          handleUpdateRecipe={handleUpdateRecipe}
          handleShowRecipe={handleShowRecipe}
          recipes={recipeStore!.recipes}
          isMobile={uiStateStore!.isMobile}
        />
      )}
    </>
  );
};

export default inject("uiStateStore", "productStore", "recipeStore")(observer(RecipesContainer));
