import React, { FormEvent, useEffect, useState } from 'react'
import './App.css'
import { Link, useParams } from 'react-router-dom';
import { createDeck } from './api/createDeck';
import { TDeck, getDecks } from './api/getDecks';
import { deleteDeck } from './api/deleteDeck';
import { createCard } from './api/createCard';
import { getDeck } from './api/getDeck';
import { deleteCard } from './api/deleteCard';


export default function Deck() {
    
    //Use Params lets us get params from the url link
    const { deckId } = useParams();

    const [deck, setDeck] = useState<TDeck | undefined>();
    const [cards, setCards] = useState<string[]>([]);
    //State for the Input box.
    const [text, setText] = useState<string>("");


    async function handleCreateDeck(e: FormEvent) {
        e.preventDefault() //Prevents default action of the form.

        //Call helper to add a new card with the specified text.
        const { cards: newCards } = await createCard(deckId!, text);
        //Set the array of cards to view to the current string[] array of cards
        setCards(newCards);
        //Clear the textbox
        setText("");
    }

  async function handleDeleteCard(index: number) {
    
    if (!deckId) return;
    //Fetch your delete request to the API with the deckID and the index to delete
    const updatedDeck = await deleteCard(deckId, index);

    //Set your deck to the updated version of the deck returned.
    setDeck(updatedDeck);
    //Update the card returned with the deck
    setCards(updatedDeck.cards);
  }

  /**
   * Use effect loads a the beginning of the page or compnent's use. 
   * This one loads the array of decks from the database to display 
   * for the user.
   * 
   * Upon exiting or ending use of the component, the return function is
   * called to allow you to cleanup the resources you were using in the 
   * browser. Like clearing out an array of decks. Currently, this still
   * needs to be setup.
   */
  useEffect(() => {
    
      
      //When we originally load this component, the body of this function executes.
      console.log("We are loading the cards in the deck.")
      
      //Define Function here to fetch all our decks.
      async function fetchDeck() {
        
        //Check if deck already is loaded first
        if (!deckId) {
            return;
        }

        //Call helper to get the url deckId deck from the database.
        const newDeck = await getDeck(deckId);
        //Update our current array of decks.
        if (newDeck) {
            setDeck(newDeck);
            setCards(newDeck.cards);
        }
    }

    //Call fetchDecks()
    fetchDeck();

    //When we are no longer displaying this component, this cleanup function is called
    //This is an optional function
    return () => {
      console.log("We are cleaning up things on exiting the deck.")
    }
  }, [deckId]) 

    return (
        <>
            <div className='App'>

                <ul className="decks">
                {   
                    cards.map((card, index) => (
                    <li key={card}>
                        <button onClick={() => handleDeleteCard(index)}>X</button>
                        {card}
                    </li>
                    ))
                }
                </ul>

                <form onSubmit={handleCreateDeck}>
                <label htmlFor='card-text'>Card Text: </label>
                <input id='card-text'
                    value={text}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    setText(e.target.value)
                    }}
                />
                <button>Create Card</button>
                </form>
            </div>
        </>
    )
}