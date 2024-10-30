const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/user');


// Load environment variablesā
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Connect to MongoDB using the connection string from the .env file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1); // Exit if MongoDB connection fails
});

// Routes
const itemsRoute = require('./routes/itemRoutes');
const usersRoute = require('./routes/userrouter');
// const user = require('./models/user');
app.use('/', itemsRoute);
app.use('/',usersRoute );


// //Getall_users
// app.get('/api/getall_users',async(req,res)=>{
//     try{
//       const users=await User.find();
//       res.status(200).json({users})
//       res.json({message:'users get successfully'})
//     }catch(err){
//       res.status(500).json({error:'Failed to get items'})
//     }
// })

// // update_users
// app.put('/api/update/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const updatedUser = await User.findByIdAndUpdate(id, req.body, {
//       new: true, // Return the updated document
//       runValidators: true // Ensure validators are run on the update
//     });

//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Return the updated user data with a success message
//     res.json({ message: "User updated successfully", user: updatedUser });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update user" });
//   }
// });

// // Delete users
// app.delete('/api/delete/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const users = await User.findByIdAndDelete(id);
//     if (!users) {
//       return res.status(404).json({ error: 'Item not found' });
//     }
//     res.json({ message: 'Item deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete item' });
//   }
// });


// // Register API
// app.post('/api/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({ name, email, password });
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Login API
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Protected route
// app.get('/api/protected', authenticateToken, (req, res) => {
//   res.json({ msg: 'This is a protected route' });
// });

// // Middleware to verify JWT
// function authenticateToken(req, res, next) {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(403).json({ msg: 'Token is not valid' });
//   }
// }

// Start the server on the port from the .env file
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
