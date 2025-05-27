import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import { insertReview, findReview, findReviews, findReviewsByProductId, updateReview, deleteReview } from "@/services/reviews.service";

async function createReview(req: Request, res: Response, next: NextFunction): Promise<any> {
    const data = req.body;

    if (!data) return res.status(400).json({ success: false, message: 'No data provided' });

    const result = await insertReview(data);

    if (!result) return res.status(500).json({ success: false, message: 'Failed to create review' });

    return res.status(201).json({
        success: true,
        message: 'Review created successfully',
        data: result,
    });
}

async function getReview(req: Request, res: Response, next: NextFunction): Promise<any> {
    const id = req.params.id;

    if (!id) return res.status(400).json({ success: false, message: 'No id provided' });

    const result = await findReview(ObjectId.createFromHexString(id));

    if (!result) return res.status(404).json({ success: false, message: 'Review not found' });

    return res.status(200).json({
        success: true,
        message: 'Review found successfully',
        data: result,
    });
}

async function getReviews(req: Request, res: Response, next: NextFunction): Promise<any> {
    const result = await findReviews();

    if (!result) return res.status(404).json({ success: false, message: 'No reviews found' });

    return res.status(200).json({
        success: true,
        message: 'Reviews found successfully',
        data: result,
    });
}

async function getReviewsByProductId(req: Request, res: Response, next: NextFunction): Promise<any> {
    const productId = req.params.productId;

    if (!productId) return res.status(400).json({ success: false, message: 'No product ID provided' });

    const result = await findReviewsByProductId(ObjectId.createFromHexString(productId));

    if (!result) return res.status(404).json({ success: false, message: 'No reviews found for this product' });

    return res.status(200).json({
        success: true,
        message: 'Reviews found successfully',
        data: result,
    });
}

async function changeReview(req: Request, res: Response, next: NextFunction): Promise<any> {
    const id = req.params.id;
    const data = req.body;

    if (!id) return res.status(400).json({ success: false, message: 'No id provided' });
    if (!data) return res.status(400).json({ success: false, message: 'No data provided' });

    const result = await updateReview(ObjectId.createFromHexString(id), data);

    if (!result) return res.status(404).json({ success: false, message: 'Review not found' });

    return res.status(200).json({
        success: true,
        message: 'Review updated successfully',
        data: result,
    });
}

async function removeReview(req: Request, res: Response, next: NextFunction): Promise<any> {
    const id = req.params.id;

    if (!id) return res.status(400).json({ success: false, message: 'No id provided' });

    const result = await deleteReview(ObjectId.createFromHexString(id));

    if (!result) return res.status(404).json({ success: false, message: 'Review not found' });

    return res.status(200).json({
        success: true,
        message: 'Review deleted successfully',
        data: result,
    });
}

export { createReview, getReview, getReviews, getReviewsByProductId, changeReview, removeReview };