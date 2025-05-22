import express from "express";
import cors from "cors";

import { clientURL } from "@/config/env";

// Create express application
const app = express();

// Set up middleware
app.use(cors({
    origin: clientURL,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;