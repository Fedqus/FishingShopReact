const Product = require('../models/product.model');

class productController {

    async createProduct(req, res) {
        try {
            const { name, description, price, category, stock, image } = req.body;
            const user = req.user;

            const product = new Product({
                name,
                description,
                price,
                category,
                stock,
                image,
                user: user.id
            });

            await product.save();
            return res.status(201).json(product);
        } catch (e) {
            return res.status(500).json({ message: 'Error creating product', error: e });
        }
    }

    async getProducts(req, res) {
        try {
            const products = await Product.find();

            return res.status(200).json(products);
        } catch (e) {
            return res.status(500).json({ message: 'Error fetching products', error: e });
        }
    }

    async getProductById(req, res) {
        try {
            const id = req.params.id;
            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found!' });
            }
            return res.status(200).json(product);
        } catch (e) {
            return res.status(500).json({ message: 'Error fetching product', error: e });
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const updates = req.body;

            const product = await Product.findByIdAndUpdate(id, updates, {
                new: true,
                runValidators: true
            });

            if (!product) {
                return res.status(404).json({ message: 'Product not found!' });
            }
            return res.status(200).json(product);
        } catch (e) {
            return res.status(500).json({ message: 'Error updating product', error: e });
        }
    }


}

module.exports = new productController();