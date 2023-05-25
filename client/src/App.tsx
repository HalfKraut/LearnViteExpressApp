import React, { FormEvent, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  //State for the Input box.
  const [title, setTitle] = useState<string>("")

  function handleCreateDeck(e: FormEvent) {
    e.preventDefault() //Prevents default action of the form.
    
    /**
     * Fetch is native to browsers. Allows us to call an API enpoint.
     * Need to pass in some initial option to tell fetch the method 
     * we are going to use. We also need to send the body of the 
     * request as a string using JSON.stringify()
     */
    fetch('http://localhost:5000/decks', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
      }), 
    });
  }

  return (
    <>
      <div className='App'>
        <form onSubmit={handleCreateDeck}>
          <label htmlFor='deck-title'>Deck Title: </label>
          <input id='deck-title'
            value={title}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value)
            }}
          />
          <button>Create Deck</button>
        </form>
      </div>
    </>
  )
}

export default App
