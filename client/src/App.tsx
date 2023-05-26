import React, { FormEvent, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface Deck {
  _id: number;
  title: string;
}


function App() {

  //State for the Input box.
  const [title, setTitle] = useState<string>("")
  //State for the array of decks to display to the user
  const [decks, setDecks] = useState<Deck[]>([]);

  async function handleCreateDeck(e: FormEvent) {
    e.preventDefault() //Prevents default action of the form.
    
    /**
     * Fetch is native to browsers. Allows us to call an API enpoint.
     * Need to pass in some initial option to tell fetch the method 
     * we are going to use. We also need to send the body of the 
     * request as a string using JSON.stringify()
     */
    await fetch('http://localhost:5000/decks', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
      }), 
    });
    setTitle("");
  }

  useEffect(() => {
    //When we originally load this component, the body of this function executes.
    console.log("We are loading things at the beginning")
    
    // //Async function calls are not allowed in the useEffect function, but there are workarounds
    // async function fetchDecks() {
    //   fetch("url", {});  
    // }
    // fetchDecks();

    // //Anonymous function that is async
    // (async () => {
    //   fetch("url", {});
    // })();

    async function fetchDecks() {
      //Fetch our list of deck from the API, one way to do it.
      //const response = await fetch('http://localhost:5000/decks')
      //const newDecks = response.json();
      //setDecks(newDecks);

      //Can also use promise chaining to format the json of the decks
      const newDecks = await fetch('http://localhost:5000/decks').then(
        (response) => response.json()
      );
      setDecks(newDecks);
    }

    //Call fetchDecks()
    fetchDecks();

    //When we are no longer displaying this component, this cleanup function is called
    //This is an optional function
    return () => {
      console.log("We are cleaning up things on exit")
    }
  }, []) 

  return (
    <>
      <div className='App'>

        <ul className="decks">
          {
            decks.map((deck) => (
              <li key={deck._id}>{deck.title}</li>
            ))
          }
        </ul>

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
