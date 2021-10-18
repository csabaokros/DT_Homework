import { SEARCH_COCKTAIL_URL, SEARCH_INGREDIENT_URL } from "./apiConfig.mjs"
import { filterCocktailData, filterIngredientData } from "./filters.mjs"

export const SEARCH_TYPE = {
    "COCKTAIL": SEARCH_COCKTAIL_URL,
    "INGREDIENT": SEARCH_INGREDIENT_URL
}

export const DATA_FILTERS = {
    "COCKTAIL": filterCocktailData,
    "INGREDIENT": filterIngredientData
}