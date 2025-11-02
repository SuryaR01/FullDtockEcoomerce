

import Product from "../model/productModel.js";


// create products...
export const create = async (req, res) => {
  try {
    const { name, price, category, description , image , stock } = req.body;

    if (!name || !price || !category || !description || !image || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingProduct = await Product.findOne({ name: name.trim() });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists." });
    }

    const newProduct = new Product({ name, price, category, description , image , stock });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


//get products
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};



//update products
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true, // returns updated document
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


//delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};



// 🧾 Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); 

    if (products.length === 0) {
      return res.status(200).json({
        message: "No products found",
        products: [],
      });
    }

    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
