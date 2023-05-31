import { API_URL } from "./apiConfig";
import { TDeck } from "./getDecks";

/**
 * This function deletes a deck from the database.
 *
 * Best practice is to remove the "fetch" calls from your components
 * so we made this separate file for exporting this method.
 */

export async function deleteCard(
    deckId: string,
    index: number
): Promise<TDeck> {
    //Fetch your delete request to the API with the deckID added to the string
    const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
        method: "DELETE",
    });

    return response.json();
}
