import { Request, Response, request } from "express";
import DeckModel from "../models/Deck";

export async function createCardForDeckController(req: Request, res: Response) {
    //Fetch the deckId from the request and get the deck from the database
    const deckId = req.params.deckId;
    const deck = await DeckModel.findById(deckId);

    if (!deck) {
        return res.status(400).send("The Deck ID requested does not exist.");
    }

    //Get the text from the body.
    const { text } = req.body;

    //Add the newCard text to the Deck and save it in the database.
    deck.cards.push(text);
    await deck.save();

    //Respond with the updated deck
    res.json(deck);

    //const newCard = new Card({});
}
