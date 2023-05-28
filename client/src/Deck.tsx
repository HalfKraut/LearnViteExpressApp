import React, { FormEvent, useEffect, useState } from 'react'
import './App.css'
import { Link, useParams } from 'react-router-dom';
import { createDeck } from './api/createDeck';
import { TDeck, getDecks } from './api/getDecks';
import { deleteDeck } from './api/deleteDeck';
import { createCard } from './api/createCard';


export default function Deck() {
    
    //Use Params lets us get params from the url link
    const { deckId } = useParams();

    //State for the Input box.
    const [text, setText] = useState<string>("")
    const [cards, setCards] = useState<string[]>([])


    async function handleCreateDeck(e: FormEvent) {
        e.preventDefault() //Prevents default action of the form.

        //Call helper to add a new card with the specified text.
        const { cards: newCards } = await createCard(deckId!, text);
        //Set the array of cards to view to the current string[] array of cards
        setCards(newCards);
        //Clear the textbox
        setText("");
    }

//   async function handleDeleteDeck(deckId: number) {
    
//     //Fetch your delete request to the API with the deckID added to the string
//     const deletedDeck = await deleteDeck(deckId);

//     //Filter to return an array of decks that do not have the ID we just deleted.
//     setDecks(decks.filter(deck => deck._id !== deletedDeck._id))
//   }

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
//   useEffect(() => {
//     //When we originally load this component, the body of this function executes.
//     console.log("We are loading things at the beginning")

//     //Define Function here to fetch all our decks.
//     async function fetchDecks() {

//       //Call helper to get all decks from the database.
//       const newDecks = await getDecks();
//       //Update our current array of decks.
//       setDecks(newDecks);
//     }

//     //Call fetchDecks()
//     fetchDecks();

//     //When we are no longer displaying this component, this cleanup function is called
//     //This is an optional function
//     return () => {
//       console.log("We are cleaning up things on exit")
//     }
//   }, []) 

    return (
        <>
            <div className='App'>

                <ul className="decks">
                {
                    cards.map((card) => (
                    <li key={card}>
                        {/* <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
                        <Link to={`decks/${deck._id}`}>
                        {card}
                        </Link> */}
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