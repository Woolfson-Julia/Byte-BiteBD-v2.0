import Joi from 'joi';

// Joi-схема для інгредієнтів у рецепті
const ingredientSchema = Joi.object({
  id: Joi.string().required(),
  measure: Joi.string().required(),
});

// Joi-схема для створення нового рецепту
export const createRecipeSchema = Joi.object({
  title: Joi.string().max(64).required(),
  description: Joi.string().max(200).required(),
  time: Joi.number().integer().min(1).max(360).required(),
  cals: Joi.number().integer().min(1).max(10000).optional(),
  category: Joi.string().required(),
  ingredients: Joi.array().items(ingredientSchema).min(2).max(16).required(),
  instructions: Joi.string().max(1200).required(),
  thumb: Joi.string().uri().optional(),
});
