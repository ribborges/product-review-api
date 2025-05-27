import { MongoServerError, ObjectId } from 'mongodb';
import { merge } from 'lodash-es';

import client from "@/database/client";
import { dbName } from "@/database/operations";
import MongoValidation from '@/helpers/MongoValidation';

const collectionName = "reviews";

async function insertReview(data: object) {
    try {
        const collection = client
            .db(dbName)
            .collection(collectionName);

        const createdAt = new Date();

        merge(data, { createdAt });

        const result = await collection.insertOne(data);

        if (!result.acknowledged) throw new Error("Failed to insert review");

        return {
            ...data,
            createdAt
        };
    } catch (error) {
        if (error instanceof MongoServerError) console.error(`Error on insert to database: ${MongoValidation.getMessages(error)}`);
        else console.error(`Error on insert to database: ${error}`);
    }
}

async function findReview(id: ObjectId) {
    try {
        const collection = client
            .db(dbName)
            .collection(collectionName);

        const result = await collection.findOne({ _id: id });

        if (!result) throw new Error("Review not found");

        return result;
    } catch (error) {
        if (error instanceof MongoServerError) console.error(`Error on find review: ${MongoValidation.getMessages(error)}`);
        else console.error(`Error on find review: ${error}`);
    }
}

async function findReviews() {
    try {
        const collection = client
            .db(dbName)
            .collection(collectionName);

        const result = await collection.find({}).toArray();

        if (!result) throw new Error("No reviews found");

        return result;
    } catch (error) {
        if (error instanceof MongoServerError) console.error(`Error on find reviews: ${MongoValidation.getMessages(error)}`);
        else console.error(`Error on find reviews: ${error}`);
    }
}

async function findReviewsByProductId(productId: ObjectId) {
    try {
        const collection = client
            .db(dbName)
            .collection(collectionName);

        const result = await collection.find({ productId }).toArray();
        if (!result) throw new Error("No reviews found for this product");
        return result;
    } catch (error) {
        if (error instanceof MongoServerError) console.error(`Error on find reviews by product ID: ${MongoValidation.getMessages(error)}`);
        else console.error(`Error on find reviews by product ID: ${error}`);
    }
}

async function updateReview(id: ObjectId, data: object) {
    try {
        const collection = client
            .db(dbName)
            .collection(collectionName);
        const updatedAt = new Date();
        merge(data, { updatedAt });
        const result = await collection.updateOne({ _id: id }, { $set: data });
        if (result.matchedCount === 0) throw new Error("Review not found or no changes made");
        return {
            ...data,
            updatedAt
        };
    } catch (error) {
        if (error instanceof MongoServerError) console.error(`Error on update review: ${MongoValidation.getMessages(error)}`);
        else console.error(`Error on update review: ${error}`);
    }
}

async function deleteReview(id: ObjectId) {
    try {
        const collection = client
            .db(dbName)
            .collection(collectionName);

        const result = await collection.deleteOne({ _id: id });
        if (result.deletedCount === 0) throw new Error("Review not found or already deleted");
        return { message: "Review deleted successfully" };
    } catch (error) {
        if (error instanceof MongoServerError) console.error(`Error on delete review: ${MongoValidation.getMessages(error)}`);
        else console.error(`Error on delete review: ${error}`);
    }
}

export { insertReview, findReview, findReviews, findReviewsByProductId, updateReview, deleteReview };
