export const filterCocktailData = ({ drinks }) => {
    if (!drinks) return []
    return drinks.map(({ strDrink, strInstructions, strDrinkThumb, ...drink }) => {

        const currentDrink = { strDrink, strInstructions, strDrinkThumb }
        currentDrink.ingredients = []
        for (let i = 0; i < 15; i++) {
            if (drink["strIngredient" + i]) {
                const ingredient = {
                    type: drink["strIngredient" + i],
                    amount: drink["strMeasure" + i]
                }
                currentDrink.ingredients.push(ingredient)
            }
        }
        return currentDrink
    })
}

export const filterIngredientData = ({ ingredients }) => {
    return ingredients
}
