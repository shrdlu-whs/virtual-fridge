import React from "react";
import { useStyles } from "./recipeCards.styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { IApiRecipe } from "../../../interfaces/api/api-recipe.interface";
import { Box, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Tooltip } from "@material-ui/core";
import { IApiProduct } from "../../../interfaces/api/api-product.interface";
import FavIcon from "@material-ui/icons/Favorite";
import FavBorderIcon from "@material-ui/icons/FavoriteBorder";
import Toolbar from "./recipeToolbar/recipeToobar";
import { observer } from "mobx-react";
import DifficultIcon from "@material-ui/icons/Equalizer";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TimeIcon from "@material-ui/icons/Schedule";
import OverflowIcon from "@material-ui/icons/MoreVert";
import Cellular0Icon from "@material-ui/icons/SignalCellular0Bar";
import Cellular1Icon from "@material-ui/icons/SignalCellular2Bar";
import Cellular2Icon from "@material-ui/icons/SignalCellular4Bar";
import { useTranslation } from "react-i18next";
import { getMilliesFormated, getMinutesTotalRounded } from "../../../utils/time.utils";
import { IApiRecipeItem } from "../../../interfaces/api/api-recipeItem.interface";

interface IRecipeCardsProps {
  handleUpdateRecipe: (recipe: IApiRecipe) => void;
  handleAddRecipe: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleDeleteRecipe: (id: number) => void;
  handleShowRecipe: (recipe: IApiRecipe) => void;
  recipes: IApiRecipe[];
  isMobile: boolean;
}

const RecipeCards = ({ handleUpdateRecipe, handleAddRecipe, handleDeleteRecipe, handleShowRecipe, recipes, isMobile }: IRecipeCardsProps) => {
  const [filteredCards, setFilteredCards] = React.useState<IApiRecipe[]>([]);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuRecipe, setMenuRecipe] = React.useState<IApiRecipe>();
  const { t } = useTranslation();
  const classes = useStyles();

  React.useEffect(() => {
    setFilteredCards(recipes);
  }, [recipes]);

  //#region Filtering
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.value;
    const newFilteredCards = recipes.filter((recipe) => recipe.name.toLowerCase().includes(newVal?.toLowerCase()));
    setFilteredCards(newFilteredCards);
  };
  //#endregion

  const handleFavoriteClick = (recipe: IApiRecipe) => {
    console.log(recipe.name);
    console.log(recipe.id);
    recipe.favorite = !recipe.favorite;
    handleUpdateRecipe(recipe);
  };

  const handleOverflowMenuClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, recipe: IApiRecipe) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuOpen(true);
    setMenuRecipe(recipe);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuOpen(false);
  };

  const handleMenuEditClick = () => {
    if (menuRecipe) {
      // TODO:
    }
  };

  const handleMenuDeleteClick = () => {
    if (menuRecipe) {
      setMenuOpen(false);
      setMenuAnchorEl(null);
      handleDeleteRecipe(menuRecipe.id!);
      setMenuRecipe(undefined);
    }
  };

  const sortRecipes = (a: IApiRecipe, b: IApiRecipe) => {
    if (a.favorite && b.favorite) return 0;
    if (a.favorite && !b.favorite) return -1;
    return 1;
  };

  //#region Saturation
  const getSaturationPercent = (recipeItems: IApiRecipeItem[]) => {
    let saturationPercent: number = 0;
    let saturationPercentTotal: number = 0;
    for (const item of recipeItems) {
      const saturation = item.product.totalQuantity / item.quantity;
      saturationPercent += saturation < 1 ? saturation / recipeItems.length : 1 / recipeItems.length;
      saturationPercentTotal += saturation / recipeItems.length;
    }
    return { saturationPercent, saturationPercentTotal };
  };

  const getSaturationTooltip = (recipeItems: IApiRecipeItem[]) => {
    const { saturationPercent, saturationPercentTotal } = getSaturationPercent(recipeItems);
    if (saturationPercent === 1) {
      // Durchschnittlich 2x so viel auf Lager
      return t("label.item_stock_saturation_2")
    } else if (saturationPercent >= 0.5) {
      return t("label.item_stock_saturation_1")
    } else {
      return t("label.item_stock_saturation_0")
    }
  }

  const getSaturationIcon = (recipeItems: IApiRecipeItem[]) => {
    const { saturationPercent, saturationPercentTotal } = getSaturationPercent(recipeItems);
    if (saturationPercent === 1) {
      // Durchschnittlich 2x so viel auf Lager
      return <Cellular2Icon />;
    } else if (saturationPercent >= 0.5) {
      return <Cellular1Icon />;
    } else {
      return <Cellular0Icon />;
    }
  };

  const getSaturationColor = (recipeItems: IApiRecipeItem[]) => {
    const { saturationPercent, saturationPercentTotal } = getSaturationPercent(recipeItems);

    if (saturationPercent === 1) {
      // Durchschnittlich 2x so viel auf Lager
      return classes.green;
    } else if (saturationPercent >= 0.5) {
      return classes.yellow;
    } else {
      return classes.red;
    }
  };
   //#endregion Saturation

  return (
    <Grid container direction="row" justify="center" alignItems="flex-start">
      <Grid container item xl={6} xs={12} justify="space-between" spacing={3}>
        <Toolbar handleAddRecipe={handleAddRecipe} handleSearch={handleSearch} isMobile={isMobile} />
        {filteredCards
          .slice()
          .sort(sortRecipes)
          .map((recipe, index) => {
            return (
              <Grid item key={recipe.id}>
                <Card className={classes.cardRoot}>
                  <CardActionArea onClick={() => handleShowRecipe(recipe)}>
                    <CardMedia className={classes.media} image={process.env.PUBLIC_URL + "/images/cards/empty_01.jpg"} title="Contemplative Reptile" />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {recipe.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="h2" noWrap>
                        {recipe.shortDescription}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Grid container justify="space-between">
                      <Grid item>
                        <Box component="span">
                          <DifficultIcon />
                          <Typography variant="subtitle2" noWrap={true}>
                            {t(`value.recipe_difficulty_${recipe.difficulty}`)}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box component="span">
                          <TimeIcon />
                          <Typography variant="subtitle2" noWrap={true}>
                            {getMinutesTotalRounded(recipe.expectedTime)}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Tooltip title={getSaturationTooltip(recipe.recipeItems)}>
                          <IconButton className={getSaturationColor(recipe.recipeItems)} aria-label="cancel">
                            {getSaturationIcon(recipe.recipeItems)}
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={() => handleFavoriteClick(recipe)} aria-label="cancel">
                          {recipe.favorite ? <FavIcon /> : <FavBorderIcon />}
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={(evt) => handleOverflowMenuClick(evt, recipe)} aria-label="cancel">
                          <OverflowIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        <Menu
          anchorEl={menuAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={menuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem key="editMenu" onClick={(evt) => handleMenuEditClick()}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("label.recipe_menu_edit")} />
          </MenuItem>
          <MenuItem key="deleteMenu" onClick={(evt) => handleMenuDeleteClick()}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("label.recipe_menu_delete")} />
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default observer(RecipeCards);
