import { API_URL } from "./apiConfig";
import { Deck } from "./getDecks";

/**
 * This function deletes a deck from the database.
 *
 * Best practice is to remove the "fetch" calls from your components
 * so we made this separate file for exporting this method.
 */

export async function deleteDeck(deckId: number): Promise<Deck> {
    //Fetch your delete request to the API with the deckID added to the string
    const response = await fetch(`${API_URL}/decks/${deckId}`, {
        method: "DELETE",
    });

    return response.json();
}
