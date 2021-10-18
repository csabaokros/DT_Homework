import fetch from 'node-fetch'

import { RANDOM_COCKTAIL_URL } from "../apiConfig.mjs"
import { DATA_FILTERS } from "../constants.mjs"


export const getRandomCocktail = async (req, res) => {
    try {
        console.info(`Fetching ${RANDOM_COCKTAIL_URL}`);

        const fetchingRandomCocktail = fetch(RANDOM_COCKTAIL_URL)
        const cocktailResource = await fetchingRandomCocktail
        const cocktail = await cocktailResource.json()
        res.end(JSON.stringify(DATA_FILTERS["COCKTAIL"](cocktail)))
    } catch (err) {
        console.error(err);
        res.status(500).send()
    }
}