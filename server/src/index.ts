import { config } from "dotenv";
config(); //Load Config for API

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import Deck from "./models/Deck";

/**
 * This is made based on the following youtube tutorial:
 * https://www.youtube.com/watch?v=G_XyAfcLeqI
 *
 * We are making a flashcard app for users to study with.
 * The app will have a restful Express backend with a frontend
 * made using Vite and React.
 *
 */

const PORT = 5000; //Set Test API port

//Setup the express app for requests
const app = express();

//Setup API to allow cross origin requests.
app.use(cors());
//Setup middleware to allow support for JSON post requests.
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/decks", async (req: Request, res: Response) => {
    //TODO: Fetch all decks and send back to the user.
    // 1. How to we fetch the decks from MongoDB?
    const decks = await Deck.find();
    // // You can put stuff in the Find() function to filter your query
    // {
    //     $where: //You put stuff here as a REGEX espression
    // }
    console.log(decks);
    // 2. How do we send back the array to the UI?
    res.json(decks);
});

app.post("/decks", async (req: Request, res: Response) => {
    console.log(req.body);

    //Start by creating a new Deck for the Flashcard app we are making.
    const newDeck = new Deck({
        title: req.body.title,
    });

    const createdDeck = await newDeck.save();
    res.json(createdDeck);
});

app.delete("/decks/:deckId", async (req: Request, res) => {
    // Todo:
    // 1. Get the deck ID from the url
    const deckId = req.params.deckId;
    // 2. Delete the deck from mongo.
    const deck = await Deck.findByIdAndDelete(deckId);
    // 3. Return the deleted deck to the user who made the req
    res.json(deck);
});

/**
 * Connects to MongoDB setup for this API, then starts the server after the db
 * promise resolves.
 */
mongoose.connect(process.env.MONGO_URL!).then(() => {
    app.listen(PORT, () => {
        console.log(`Now Listening on Port: ${PORT}\nhttp://localhost:${PORT}`);
    });
});
