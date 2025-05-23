import { Router } from "express";

import productRoutes from "@/router/routes/products.routes";

const router = Router();

export default (): Router => {
    productRoutes(router);

    return router;
}
