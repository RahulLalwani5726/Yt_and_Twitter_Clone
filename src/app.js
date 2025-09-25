import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors(
    // cors ek object leta hai ye optinal hai
    {
        // isme hum ye bta te hai ke hamara backend kis kis origin (front end) se communicate kr sakta hai
        origin: process.env.CORS_ORIGIN, // * matlub all origin
        credentials: true // isse hum req ke sath user ke private cheez jaise ookie, token, ya session le sakte hai
    }
)); // <- app.use() midleware or configration ke liye kiya jaata hai

app.use(express.json(
    // express.json server me json req ko accept kr ta hai 
    // ye obj leta hai
    {
        limit: "16kb" // ye json ke limit set kr ta hai ke kitne json ek baar me le sakta hai ye server ke power per depand kr ta hai
    }
)) 

app.use(express.urlencoded(
    // iska use url ke data ko endcoded kar na hai 
    // ye object leta hai jo optional hai
    {
        extended:true, // iska matlub internal encoding nexting se hai
        limit:"16kb"
    }
))

app.use(
    express.static("public") // iska use public assests ko store kar ne se hai ke ek public naam ka folder hai jisme koi pdf aaya use wha rakha jaata hai aur publucy useable hai
)

app.use(cookieParser()) // iska use use ke brouser be secure cookie ko store / delete kar na aur user ke cookie me curd operation karna hai