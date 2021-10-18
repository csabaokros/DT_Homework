export const BASE_URL = "https://www.thecocktaildb.com/api/json/v1"
export const API_KEY = "1"

export const COCKTAIL_API_BASE_AND_KEY = `${BASE_URL}/${API_KEY}`

// Relevant API Endpoints
export const EP_SEARCH_BY_NAME = "search.php?s="
export const EP_RANDOM_COCKTAIL = "random.php"

export const RANDOM_COCKTAIL_URL = `${COCKTAIL_API_BASE_AND_KEY}/${EP_RANDOM_COCKTAIL}`
export const SEARCH_COCKTAIL_URL = `${COCKTAIL_API_BASE_AND_KEY}/${EP_SEARCH_BY_NAME}`