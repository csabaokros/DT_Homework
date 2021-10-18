import fetch from "node-fetch"

import { SEARCH_TYPE } from "../constants.mjs"

export const searchByName = type => async (req, res) => {

    const searchUrl = SEARCH_TYPE[type]

    if (!req.query.q) res.status(401).send("Search parameter is mandatory")
    const searchQuery = req.query.q

    try {
        console.info(`Fetching ${searchUrl}${searchQuery}`);

        const fetchingRandomCocktail = fetch(searchUrl + searchQuery)
        const cocktailResource = await fetchingRandomCocktail
        const cocktail = await cocktailResource.json()
        res.end(JSON.stringify(cocktail))
    } catch (err) {
        console.error(err);
        res.status(500).send()
    }
}