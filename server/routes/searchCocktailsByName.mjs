import fetch from 'node-fetch'

import { SEARCH_COCKTAIL_URL } from "../apiConfig.mjs"

export const searchCocktailsByName = async (req, res) => {
    if (!req.query.q) res.status(401).send("Search parameter is mandatory")
    const searchQuery = req.query.q

    try {
        console.info(`Fetching ${SEARCH_COCKTAIL_URL}${searchQuery}`);

        const fetchingRandomCocktail = fetch(SEARCH_COCKTAIL_URL + searchQuery)
        const cocktailResource = await fetchingRandomCocktail
        const cocktail = await cocktailResource.json()
        res.end(JSON.stringify(cocktail))
    } catch (err) {
        console.error(err);
        res.status(500).send()
    }
}