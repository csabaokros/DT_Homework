import './App.css';

import { useState, useEffect } from 'react';

function App() {
  const [ cocktailList, setCocktailList ] = useState([])
  const [ searchQuery, setSearchQuery] = useState("")
  const [ fetchInProgress, setFetchInprogress ] = useState(true)

  const handleSearch = async (e) => {
    e.preventDefault()
    if(!searchQuery) return
    setCocktailList([])
    let drinks
    try {
      drinks = await fetchDataFromAPI(`http://localhost:8080/api/cocktail/search?q=${searchQuery}`)
    } catch (err) {
      console.error(err)
      setCocktailList([])
    }
    setCocktailList(drinks);
  }

  const fetchDataFromAPI = async url => {
    setFetchInprogress(true)
    return fetch(url)
    .then((result) => {
      return result.json()
    })
    .then((drinks) => {
      setFetchInprogress(false)
      return drinks
    })
    .catch((err) => {
      console.error(err)
      setFetchInprogress(false)
    })
  }

  const getRandomCocktail = async () => {
    setSearchQuery("")
    setCocktailList([])
    let drinks
    try {
      drinks = await fetchDataFromAPI("http://localhost:8080/api/cocktail/random")
      setCocktailList(drinks)
    } catch(err) {
      console.error(err)
      setCocktailList([])
    }
  }

  useEffect(() => {
    getRandomCocktail()
  }, [])

  return (
    <main className="app">
      <div className="search">
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Search for a cocktail" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <button type="submit" title="Look up a recipe">🔍</button>
          <button type="button" title="I feel lucky!" onClick={getRandomCocktail}>🎲</button>
        </form>
      </div>
      {cocktailList.length === 0 && !fetchInProgress &&
        <div>
          <p>Nothing to show</p>
        </div>
      }
      {fetchInProgress &&
        <div className="loading">
          <p>Just a moment...</p>
        </div>
      }
      {cocktailList.map(({strDrink, strDrinkThumb, ingredients, strInstructions}, index) => {
        const style = {
          backgroundImage: 'url(' + strDrinkThumb + ')'
        }
        return (
        <div key={index}>
          <div className="thumbnail" style={style} />
          <div className="cocktail">
            <h1>{strDrink}</h1>
            <ul>
              {ingredients.map(({type, amount}, index) => {
                return <li key={index}><b>{amount}</b> {type}</li>
              })}
            </ul>
            <p>{strInstructions}</p>
          </div>
        </div>
        )
      })}
    </main>
  );
}

export default App;
