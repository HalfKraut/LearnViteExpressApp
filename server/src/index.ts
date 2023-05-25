import express, { Request, Response } from "express";
import mongoose from "mongoose";

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

const PORT = 5000;

const app = express();

//Setup middleware to allow support for JSON post requests.
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
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

/**
 * Connects to MongoDB setup for this API, then starts the server after the db
 * promise resolves.
 */
mongoose
    .connect(
        "mongodb+srv://Halfkraut:jJoriHK0PLePqpSK@db-sandbox.03fwtxy.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
        app.listen(PORT, () => {
            console.log(
                `Now Listening on Port: ${PORT}\nhttp://localhost:${PORT}`
            );
        });
    });
