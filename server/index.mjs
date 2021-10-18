import express from "express"
import { query } from "express-validator"

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

import { getRandomCocktail } from "./routes/getRandomCocktail.mjs"
import { searchCocktailsByName } from "./routes/searchCocktailsByName.mjs"
import { searchIngredientsByName } from "./routes/searchIngredientsByName.mjs"

const app = express()
const port = 8080

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: "index.html",
    maxAge: '1d',
    redirect: true,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}

app.use("/cocktail/", express.static('build', options))

app.get("/", (_, res) => {
    res
        .status(301)
        .set({
            "Location": "/cocktail/"
        })
        .send()
})

app.get('/api/cocktail/', getRandomCocktail)
app.get('/api/cocktail/random', getRandomCocktail)
app.get('/api/cocktail/search', query("q", "Invalid search query"), searchCocktailsByName)
app.get('/api/cocktail/searchIngredient', query("q", "Invalid search query"), searchIngredientsByName)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})