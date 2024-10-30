// controllers/itemController.js
const Item = require('../models/itemModel');

// Get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items from the database
    res.status(200).json(items); // Send the items as a JSON response
    res.json({message:'item get successfully'})
  } catch (err) {
    res.status(500).json({ error: 'Failed to get items' }); // Handle errors
  }
};

// Create a new item
const createItem = async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
    res.json({ message: 'Item created successfully' });
  } catch (err) {
    console.error("Error creating item:", err); // Log the error for debugging
    res.status(400).json({ error: 'Failed to create item' });
  }
};



// Update an item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params; // Get the item ID from the URL parameter
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }); // Update the item with new data

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' }); // Handle item not found
    }

    // res.status(200).json(updatedItem); // Send the updated item as a response
    res.json({ message: 'Item updated successfully' });

  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' }); // Handle errors
  } 
};


// Delete an item
const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
};

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem
};
