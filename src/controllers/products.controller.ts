import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import { insertProduct, findProduct, findProducts, updateProduct, deleteProduct } from "@/services/products.service";

async function createProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    const data = req.body;

    if (!data) return res.status(400).json({ success: false, message: 'No data provided' });

    const result = await insertProduct(data);

    if (!result) return res.status(500).json({ success: false, message: 'Failed to create product' });

    return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: result,
    });
}

async function getProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    const id = req.params.id;

    if (!id) return res.status(400).json({ success: false, message: 'No id provided' });

    const result = await findProduct(ObjectId.createFromHexString(id));

    if (!result) return res.status(404).json({ success: false, message: 'Product not found' });

    return res.status(200).json({
        success: true,
        message: 'Product found successfully',
        data: result,
    });
}

async function getProducts(req: Request, res: Response, next: NextFunction): Promise<any> {
    const result = await findProducts();

    if (!result) return res.status(404).json({ success: false, message: 'No products found' });

    return res.status(200).json({
        success: true,
        message: 'Products found successfully',
        data: result,
    });
}

async function changeProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    const id = req.params.id;
    const data = req.body;
    
    if (!id) return res.status(400).json({ success: false, message: 'No id provided' });
    if (!data) return res.status(400).json({ success: false, message: 'No data provided' });

    const result = await updateProduct(ObjectId.createFromHexString(id), data);

    if (!result) return res.status(404).json({ success: false, message: 'Product not found' });

    return res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: result,
    });
}

async function removeProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    const id = req.params.id;

    if (!id) return res.status(400).json({ success: false, message: 'No id provided' });

    const result = await deleteProduct(ObjectId.createFromHexString(id));

    if (!result) return res.status(404).json({ success: false, message: 'Product not found' });

    return res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        data: result,
    });
}

export { createProduct, getProduct, getProducts, changeProduct, removeProduct };