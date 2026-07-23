import dns from "node:dns";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);



dotenv.config({
    path: "./.env",
});

const port = process.env.PORT || 3000;

connectDB()
.then(() =>{
    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`);
    });
})
.catch((err) =>{
    console.error("MongoDB connection error", err);
    process.exit(1)
});