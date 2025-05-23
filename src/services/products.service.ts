import { MongoServerError, ObjectId } from 'mongodb';
import { merge } from 'lodash-es';

import client from "@/database/client";
import { dbName } from "@/database/operations";
import MongoValidation from '@/helpers/MongoValidation';

const collectionName = "products";

async function insertProduct(data: object) {
    try {
        const collection = client
            .db(dbName)
            .collection(collectionName);

        const createdAt = new Date();

        merge(data, { createdAt });

        const result = await collection.insertOne(data);

        if (!result.acknowledged) throw new Error("Failed to insert product");

        return {
            ...data,
            createdAt
        }
    } catch (error) {
        if (error instanceof MongoServerError) console.error(`Error on insert to database: ${MongoValidation.getMessages(error)}`);
        else console.error(`Error on insert to database: ${error}`);
    }
}

async function findProduct(id: ObjectId) {
    try {
        const collection = client
            .db(dbName)
            .collection(collectionName);

        const result = await collection.findOne({ _id: id });

        if (!result) throw new Error("Product not found");

        return result;
    } catch (error) {
        if (error instanceof MongoServerError) console.error(`Error on find product: ${MongoValidation.getMessages(error)}`);
        else console.error(`Error on find product: ${error}`);
    }
}

async function findProducts() {
    try {
        const collection = client
            .db(dbName)
            .collection(collectionName);

        const result = await collection.find({}).toArray();

        if (!result) throw new Error("No products found");

        return result;
    } catch (error) {
        if (error instanceof MongoServerError) console.error(`Error on find products: ${MongoValidation.getMessages(error)}`);
        else console.error(`Error on find products: ${error}`);
    }
}

async function updateProduct(id: ObjectId, data: object) {
    try {
        const collection = client
            .db(dbName)
            .collection(collectionName);

        const result = await collection.updateOne({ _id: id }, { $set: data });

        if (!result.acknowledged) throw new Error("Failed to update product");

        return result;
    } catch (error) {
        if (error instanceof MongoServerError) console.error(`Error on update product: ${MongoValidation.getMessages(error)}`);
        else console.error(`Error on update product: ${error}`);
    }
}

async function deleteProduct(id: ObjectId) {
    try {
        const collection = client
            .db(dbName)
            .collection(collectionName);

        const result = await collection.deleteOne({ _id: id });

        if (!result.acknowledged) throw new Error("Failed to delete product");

        return result;
    } catch (error) {
        if (error instanceof MongoServerError) console.error(`Error on delete product: ${MongoValidation.getMessages(error)}`);
        else console.error(`Error on delete product: ${error}`);
    }
}

export { insertProduct, findProduct, findProducts, updateProduct, deleteProduct };