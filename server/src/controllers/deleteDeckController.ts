import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export async function deleteDeckController(req: Request, res: Response) {
    // Todo:
    // 1. Get the deck ID from the url
    const deckId = req.params.deckId;
    // 2. Delete the deck from mongo.
    const deck = await DeckModel.findByIdAndDelete(deckId);
    // 3. Return the deleted deck to the user who made the req
    res.json(deck);
}
