import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovie'
import { useEffect, useState, useRef } from 'react'
import './App.css'

export function App () {
  const { movies: mappedMovies } = useMovies()
  const { search, updateSearch, error } = useSearch()
  const isFirstInput = useRef(true)

  function useSearch () {
    const [search, updateSearch] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
      if (search === '') {
        setError('No se puede buscar una película vacía')
        return
      }

      if (search.length < 3) {
        setError('Debe tener más de tres caracteres')
        return
      }

      setError(null)
    }
    , [search])

    return { search, updateSearch, error }
  }

  const handleChange = (e) => {
    updateSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ search })
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie Finder</h1>
        <form className='search-form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' type='text' placeholder='Avengers, Star Wars, Harry Potter...' />
          <button>Search</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>

      <main>
        <Movies movies={mappedMovies} />
      </main>
    </div>
  )
}
