import app from "@/server";
import { appPort } from "@/config/env";
import { connectDB } from "@/database/operations";

// Connect to the database
connectDB();

// Start the server
app.listen(appPort, () => {
    console.log(`Server is running on port ${appPort}`);
});
