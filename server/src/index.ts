import express,{ Express, Request, Response, Application } from "express";

const app:Application = express();
const PORT = process.env.PORT || 8020;


app.get("/",(req:Request, res:Response):void => {
    res.send("Hello")
});

app.listen(PORT,():void => {
    console.log(`Server is running on port ${PORT}`)
})