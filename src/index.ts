import app from "@/server";
import { appPort } from "@/config/env";

// Start the server
app.listen(appPort, () => {
    console.log(`Server is running on port ${appPort}`);
});
