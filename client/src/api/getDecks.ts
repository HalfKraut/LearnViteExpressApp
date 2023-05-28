import { API_URL } from "./apiConfig";

//Here we create the type for our decks and export it.
export interface TDeck {
    _id: number;
    title: string;
    cards: string[];
}

/**
 * This function fetches the decks from the database.
 *
 * Best practice is to remove the "fetch" calls from your components
 * so we made this separate file for exporting this method.
 */
export async function getDecks(): Promise<TDeck[]> {
    //Fetch our list of deck from the API, one way to do it.
    //const response = await fetch('http://localhost:5000/decks')
    //const newDecks = response.json();
    //setDecks(newDecks);
    const response = await fetch(`${API_URL}/decks`);
    return response.json();
}
