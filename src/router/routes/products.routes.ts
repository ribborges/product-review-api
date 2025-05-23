import { Router } from "express";

import { createProduct, getProduct, getProducts, changeProduct, removeProduct } from "@/controllers/products.controller";

export default (router: Router) => {
    router.post("/product", createProduct);
    router.get("/product/:id", getProduct);
    router.get("/products", getProducts);
    router.patch("/product/:id", changeProduct);
    router.delete("/product/:id", removeProduct);
};
