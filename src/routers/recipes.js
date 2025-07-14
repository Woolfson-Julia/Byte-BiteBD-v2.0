import express from 'express';
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  getMyRecipes,
  addToFavorites,
  removeFavorite,
  getFavorites,
  removeMyRecipe
} from '../controllers/recipe.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createRecipeSchema } from '../validation/recipe.js';
import { parseIngredientsMiddleware} from '../middlewares/parseIngredients.js';
import { optionalAuthenticate } from '../middlewares/optionalAuthenticate.js';

const router = express.Router();
const jsonParser = express.json();

//GET
router.get('/', optionalAuthenticate, ctrlWrapper(getRecipes));
//GET/id
router.get('/:id', optionalAuthenticate, ctrlWrapper(getRecipeById));

// POST з тілом
router.post('/', authenticate, upload.single('thumb'),
parseIngredientsMiddleware,
validateBody(createRecipeSchema),
ctrlWrapper(createRecipe));

//GET my
router.get('/profile/own', authenticate, ctrlWrapper(getMyRecipes));

//ADD to my favorites
router.post('/profile/favorites', authenticate, jsonParser, ctrlWrapper(addToFavorites));

//GET my favorites
router.get('/profile/favorites', authenticate, ctrlWrapper(getFavorites));

// DELETE favorites
router.delete('/profile/favorites/:recipeId', authenticate, ctrlWrapper(removeFavorite));

// DELETE my pecipe
router.delete('/profile/own/:id', authenticate, ctrlWrapper(removeMyRecipe));


export default router;
