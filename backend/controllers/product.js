import Product from '../models/product.js';

export async function createProduct(req, res) {
    const {name , price, description, picture, category} = req.body;
    try {
        const product = new Product({name , price, description, picture, category});
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function getProducts(req, res) {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
