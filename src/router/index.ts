import { Router } from "express";

import productRoutes from "@/router/routes/products.routes";
import reviewRoutes from "@/router/routes/reviews.routes";

const router = Router();

export default (): Router => {
    productRoutes(router);
    reviewRoutes(router);

    return router;
}
