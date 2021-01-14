import React, { useEffect, useState, Fragment, useReducer } from 'react'
import { Form, ListGroup, Spinner } from 'react-bootstrap'
import axios from 'axios'

function reducer(state, action) {
  switch (action.type) {
    case 'movies':
      return { ...state, moviesList: action.payload }
    default:
      throw new Error();
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, { moviesList: [] });
  return <CharacterComponent moviesList={state.moviesList} dispatch={dispatch}/>

}

export const CharacterComponent = ({ moviesList, dispatch }) => {
  const [characters, setCharacters] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState('')
  const [lastEdition, setLastEdition] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    try {
      const { data } = await axios.get('https://swapi.dev/api/people/')
      setCharacters(data.results)
    }
    catch (err) {
      console.error('Error in getting characters list', err)
    }
  }, [])

  const getMovieNamesByCharacter = async (e) => {
    setLoading(true)
    setSelectedCharacter(e.target.value)
    const characterIndex = characters.findIndex(x => x.name == e.target.value)
    try {
      //fetches the list of movies the selected character is available
      const { data } = await axios.get(`https://swapi.dev/api/people/${characterIndex}/`)
      //fetches the list of film details of the character
      const [...movies] = await Promise.all(data.films.map(filmUrl => axios.get(filmUrl)))
      //dispatches an action to load data into our component bound redux store
      dispatch({ type: 'movies', payload: movies.map(({ data }) => data.title) })
      setLastEdition(movies[movies.length - 1].data)
      setLoading(false)
    }
    catch (err) {
      console.error('Error in getting Movies list', err)
      setLoading(false)
    }
  }

  return (
    <div style={{ width: '50%', margin: 'auto', padding: 15, background: 'aliceblue', marginTop: '5%', border: '0.25px solid lightgrey', borderRadius: 5 }}>
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Character Names</Form.Label>
          <Form.Control data-testid="character-names" as="select" custom onChange={getMovieNamesByCharacter} value={selectedCharacter}>
            <option label="Select an Character" disabled></option>
            {characters.map(x => <option value={x.name}>{x.name}</option>)}
          </Form.Control>
        </Form.Group>
        {loading && <div style={{ textAlign: 'center' }}><Spinner animation="border" /></div>}
        {!loading ? <div>
          {moviesList.length ? <div data-testid='movies-list' style={{ marginBottom: 15 }}>
            <label>Movie List</label>
            <ListGroup>
              {moviesList.map(x => <ListGroup.Item>{x}</ListGroup.Item>)}
            </ListGroup>
          </div> : <Fragment />}
          {Object.keys(lastEdition).length ? <Form.Group controlId="formBasicEmail">
            <Form.Label>Name/Year Last Movie</Form.Label>
            <Form.Control type="text" placeholder="Movie Release Date" value={`${lastEdition.title} - ${lastEdition.release_date.split('-')[0]}`} />
            <Form.Text className="text-muted">
              The latest Release of the movie
          </Form.Text>
          </Form.Group> : <Fragment />}
        </div> : <Fragment />}
      </Form>

    </div>
  )
}

export default App