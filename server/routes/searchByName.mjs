import fetch from "node-fetch"

import { SEARCH_TYPE, DATA_FILTERS } from "../constants.mjs"

const cache = new Object(null)

export const searchByName = type => async (req, res) => {

    const searchUrl = SEARCH_TYPE[type]

    if (!req.query.q) res.status(401).send("Search parameter is mandatory")
    const searchQuery = req.query.q
    try {
        let result
        if (cache[`${searchUrl}${searchQuery}`]) {
            console.info(`Serving ${searchUrl}${searchQuery} from cache`);
            result = cache[`${searchUrl}${searchQuery}`]
        } else {
            console.info(`Fetching ${searchUrl}${searchQuery}`);

            const fetchingSearchResults = fetch(searchUrl + searchQuery)
            const resultResource = await fetchingSearchResults
            result = await resultResource.json()
            cache[`${searchUrl}${searchQuery}`] = result
        }
        res.end(
            JSON.stringify(
                DATA_FILTERS[type](result)
            )
        )
    } catch (err) {
        console.error(err);
        res.status(500).send()
    }
}