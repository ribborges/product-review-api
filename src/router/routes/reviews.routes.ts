import { Router } from "express";

import { createReview, getReview, getReviews, getReviewsByProductId, changeReview, removeReview } from "@/controllers/reviews.controller";

export default (router: Router) => {
    router.post("/review", createReview);
    router.get("/review/:id", getReview);
    router.get("/reviews", getReviews);
    router.get("/reviews/product/:productId", getReviewsByProductId);
    router.put("/review/:id", changeReview);
    router.delete("/review/:id", removeReview);
};
