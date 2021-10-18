import fetch from "node-fetch"

import { SEARCH_TYPE, DATA_FILTERS } from "../constants.mjs"

export const searchByName = type => async (req, res) => {

    const searchUrl = SEARCH_TYPE[type]

    if (!req.query.q) res.status(401).send("Search parameter is mandatory")
    const searchQuery = req.query.q

    try {
        console.info(`Fetching ${searchUrl}${searchQuery}`);

        const fetchingSearchResults = fetch(searchUrl + searchQuery)
        const resultResource = await fetchingSearchResults
        const result = await resultResource.json()
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