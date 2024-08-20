const Product = require('../models/product.model');

class ProductController {

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

    async getProductsByCategory(req, res) {
        try {
            const category = req.params.category;
            const products = await Product.find({ category });

            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found in this category!' });
            }

            return res.status(200).json(products);
        } catch (e) {
            return res.status(500).json({ message: 'Error fetching products by category', error: e });
        }
    }

    async deleteProduct(req, res) {
        try {
            const id = req.params.id;
            const product = await Product.findByIdAndDelete(id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found!' });
            }

            return res.status(200).json({ message: 'Product deleted successfully' });
        } catch (e) {
            return res.status(500).json({ message: 'Error deleting product', error: e });
        }
    }

    async sortProductsByPrice(req, res) {
        try {
            const { sort } = req.query;

            let sortOption = {};
            if (sort === 'asc') {
                sortOption.price = 1;
            } else if (sort === 'desc') {
                sortOption.price = -1;
            } else {
                return res.status(400).json({ message: 'Invalid sort option. Use "asc" or "desc".' });
            }

            const products = await Product.find().sort(sortOption);

            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found!' });
            }

            return res.status(200).json(products);
        } catch (e) {
            return res.status(500).json({ message: 'Error sorting products by price', error: e });
        }
    }

    async sortProducts(req, res) {
        try {
            const { field, sort } = req.query;

            let sortOption = {};

            if (field === 'price' || field === 'name') {
                sortOption[field] = sort === 'asc' ? 1 : -1;
            } else {
                return res.status(400).json({ message: 'Invalid sort field. Use "price" or "name".' });
            }

            const products = await Product.find().sort(sortOption);

            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found!' });
            }

            return res.status(200).json(products);
        } catch (e) {
            return res.status(500).json({ message: 'Error sorting products', error: e });
        }
    }

    async searchProducts(req, res) {
        try {
            const { query } = req.query;

            const products = await Product.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } }
                ]
            });

            if (products.length === 0) {
                return res.status(404).json({ message: 'No products match your search!' });
            }

            return res.status(200).json(products);
        } catch (e) {
            return res.status(500).json({ message: 'Error searching products', error: e });
        }
    }

}

module.exports = new ProductController();