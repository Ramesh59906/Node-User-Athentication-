const User = require('../models/user');
const jwt = require('jsonwebtoken');

//Getall_users
// const getall_users=async(req,res)=>{
//     try{
//       const users=await User.find();
//       res.status(200).json({users})
//       res.json({message:'users get successfully'})
//     }catch(err){
//       res.status(500).json({error:'Failed to get items'})
//     }
// }

const getall_users = async (req, res) => {
    try {
      const users = await User.find(); // Assuming User is your model
      if (!users) {
        return res.status(404).json({ error: 'No users found' }); // Return here to stop further execution
      }
      res.json(users); // Send the response once
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch users' }); // Only one response on error
    }
  };
  
// update_users
const updateuser=async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true // Ensure validators are run on the update
    });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the updated user data with a success message
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete users
const deleteuser= async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully',deleteUser:deleteUser});
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
};


// Register API
const register= async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({message:'user register successfully',token:token})
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login API
const login= async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({message:'Login Successfully',token:token})
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getall_users,
    register,
    login,
    deleteuser,
    updateuser
  };