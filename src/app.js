import express from "express";
import cors from "cors";

//express use package
const app = express();

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit:"16kb"}));
app.use(express.static("Public"));

//cors use package
app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
        credentials:true,
        methods:["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders:["Authorization", "Content-Type"]
    })
);

import healthCheckRouter from "./route/healthcheck.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);

app.get("/", (req, res) => {
    res.send("This is my first app server");
});

export default app;