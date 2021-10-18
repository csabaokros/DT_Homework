import express from "express"
import { query } from "express-validator"

import { getRandomCocktail } from "./routes/getRandomCocktail.mjs"
import { searchCocktailsByName } from "./routes/searchCocktailsByName.mjs"
import { searchIngredientsByName } from "./routes/searchIngredientsByName.mjs"

const app = express()
const port = 8080

app.get('/api/cocktail', getRandomCocktail)
app.get('/api/cocktail/search', query("q", "Invalid search query"), searchCocktailsByName)
app.get('/api/cocktail/searchIngredient', query("q", "Invalid search query"), searchIngredientsByName)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})