import express from "express";
import cors from "cors";

import { clientURL } from "@/config/env";
import router from "@/router";

// Create express application
const app = express();

// Set up middleware
app.use(cors({
    origin: clientURL,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use("/api", router());

export default app;