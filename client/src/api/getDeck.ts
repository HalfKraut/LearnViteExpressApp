import { API_URL } from "./apiConfig";
import { TDeck } from "./getDecks";

/**
 * This function fetches the decks from the database.
 *
 * Best practice is to remove the "fetch" calls from your components
 * so we made this separate file for exporting this method.
 */
export async function getDeck(deckId: string): Promise<TDeck> {
    //Fetch our deck from the API, one way to do it.
    //const response = await fetch('http://localhost:5000/decks')
    //const newDecks = response.json();
    //setDecks(newDecks);
    const response = await fetch(`${API_URL}/decks/${deckId}`);
    return response.json();
}
