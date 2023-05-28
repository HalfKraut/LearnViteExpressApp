import { API_URL } from "./apiConfig";
import { TDeck } from "./getDecks";

/**
 * This function creates a new decks in the database.
 *
 * Best practice is to remove the "fetch" calls from your components
 * so we made this separate file for exporting this method.
 */
export async function createCard(deckId: string, text: string): Promise<TDeck> {
    /**
     * Fetch is native to browsers. Allows us to call an API enpoint.
     * Need to pass in some initial option to tell fetch the method
     * we are going to use. We also need to send the body of the
     * request as a string using JSON.stringify()
     */
    const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            text,
        }),
    });

    return response.json();
}
