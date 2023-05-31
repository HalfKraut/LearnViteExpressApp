import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export async function getDecksController(req: Request, res: Response) {
    //TODO: Fetch all decks and send back to the user.
    // 1. How to we fetch the decks from MongoDB?
    const decks = await DeckModel.find();
    // // You can put stuff in the Find() function to filter your query
    // {
    //     $where: //You put stuff here as a REGEX espression
    // }
    console.log(decks);
    // 2. How do we send back the array to the UI?
    res.json(decks);
}
