import MakeConnection from "./db/ConnectWithDB.js";
import dotenv from "dotenv";
import experss from "express"

const App = experss();
dotenv.config();

MakeConnection() // humne MakeConnection ko async function bna ya ta aur jab be async function call hota hai to vo ek promise return kr ta hai
    .then(
        () => {
            const port = process.env.PORT || 8000;
            App.on("error", (err) => {
                console.log(`Error :: App.on() :: ${err}`);
            })
            App.listen(port, () => {
                console.log(`Server is Listen in port no ${port}`);
            })
        }
    )//this function is async so thats return promise
