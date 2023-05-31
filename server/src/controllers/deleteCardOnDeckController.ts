import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function deleteCardOnDeckController(req: Request, res: Response) {
    // Get the deckId and the index from the req
    const { deckId, index } = req.params;

    //Find the deck with an card to delete from the MongoDB
    const deck = await Deck.findById(deckId);

    //If there is no deck returned as deleted, we throw and error.
    if (!deck) {
        return res.status(400).send("No deck with this ID exists.");
    }

    //Splice out the index passed in as the card position to delete
    deck.cards.splice(parseInt(index), 1);

    //Save our changes to the deck we deleted a card from.
    await deck.save();

    // Return the deck we deleted the card from to the user
    res.json(deck);
}
