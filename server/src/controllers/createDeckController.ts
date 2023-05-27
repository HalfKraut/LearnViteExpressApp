import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export async function createDeckController(req: Request, res: Response) {
    console.log(req.body);

    //Start by creating a new Deck for the Flashcard app we are making.
    const newDeck = new DeckModel({
        title: req.body.title,
    });

    const createdDeck = await newDeck.save();
    res.json(createdDeck);
}
