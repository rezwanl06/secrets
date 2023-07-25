require('dotenv').config();

// Import libraries
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Import schema
const User = require('./schema/user');
const Secret = require('./schema/secret');
const Comment = require('./schema/comment');

// Import express
const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true, 
     useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB server:', error);
  });

// Middleware setup
app.use(express.json());
app.use(cors());

// register route
app.route('/register')
    .post(async (req, res) => {
        const { username, email, password } = req.body;

        try {
            console.log(`User with username: ${username}, email: ${email} tried to register\n`);
            // Check if the username already exists
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                console.log("User already exists!");
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash and salt the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();

            // Generate a JWT token for the new user
            const token = jwt.sign({ userId: newUser._id, username: newUser.username }, process.env.JWT_SECRET);

            // Send the token in the response along with the user data
            return res.status(200).json({ message: 'Registration successful', token });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });


// login route
app.route("/login")
    .post(async (req, res) => {
        const { email, password } = req.body;

        try {
        // Check if the user exists based on the provided email
        const user = await User.findOne({ email });

        if (!user) {
            // User with the given email not found
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // Incorrect password
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // If the email and password are valid, generate a token
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET);

        // Return the token to the frontend
        res.status(200).json({ message: 'Login success', token });

        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });


// Compose route
app.route('/compose')
    .post(async (req, res) => {
        // Get the JWT token from the Authorization header
        const token = req.header('Authorization').replace('Bearer ', '');

        try {
            // Decode the token to get the payload
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // Extract the userId from the decoded payload
            const userId = decodedToken.userId;

            // Get the secret content from the request body
            const { content } = req.body;

            // Save the new secret in the database
            const newSecret = new Secret({
                content,
                user: userId,
            });
            await newSecret.save();

            // Successful creation of the secret
            res.status(200).json({ message: 'Secret created successfully', secretId: newSecret._id });
        } catch (error) {
            console.error('Error creating secret:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });


// secret/secretId route
app.route('/secret/:secretId')
    .get(async (req, res) => {
        const secretId = req.params.secretId;

        try {
            // Find the secret by secretId in the database
            const secret = await Secret.findById(secretId);

            // Fetch comments by secretId
            const allComments = await Comment.find({ secret: secretId }).sort({ createdAt: -1 });
            console.log(`${allComments}`);
            
            if (!secret) {
                // Secret not found
                return res.status(404).json({ error: 'Secret not found' });
            }

            // Return the secret data
            res.status(200).json({ content: secret.content, comments: allComments });
        } catch (error) {
            console.error('Error fetching secret:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })
    .post(async (req, res) => {
        const secretId = req.params.secretId;
        const { content, username } = req.body;

        try {
            console.log(`${username}`);
            // Create a new comment
            const newComment = new Comment({
            content,
            user: username, // Store the username instead of userId
            secret: secretId,
            });

            // Save the new comment to the database
            await newComment.save();

            // Successful creation of the comment
            res.status(200).json({ message: 'Comment created successfully', commentId: newComment._id });
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

// Home route
app.route('/home')
    .get(async (req, res) => {
        try {
          // Find all secrets in the database
          const secrets = await Secret.find().sort({ createdAt: -1 });
      
          // Return the secrets as a response
          res.status(200).json({ secrets });
        } catch (error) {
          console.error('Error fetching secrets:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    
// UserId route
app.route("/:uid")
    .get(async (req, res) => {
        const uid = req.params.uid;

        try {
            // Load all secrets posted by the user
            const userSecrets = await Secret.find({ user: uid }).sort({ createdAt: -1 });

            // Send the secrets posted by the user to the client
            res.status(200).json({message: "Loaded successfully", userSecrets});
        } catch (error) {
            console.error('Error fetching secrets:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
