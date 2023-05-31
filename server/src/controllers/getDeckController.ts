import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export async function getDeckController(req: Request, res: Response) {
    //First get the deck ID
    const { deckId } = req.params;

    // Next fetch the deck by ID from MongoDB
    const deck = await DeckModel.findById(deckId);
    // // You can put stuff in the Find() function to filter your query
    // {
    //     $where: //You put stuff here as a REGEX espression
    // }

    // Log what deck we are getting
    console.log(`Loading Cards for Deck:\n ${deck}`);

    // Send back the deck to the UI with the cards
    res.json(deck);
}
