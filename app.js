

// Import Express and other dependencies
import express from 'express';
import path from 'path';

// Instantiate an Express application 
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Store workout data in memory
let workouts = [];

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views')); // Set 'views' folder

// Define the port number for our server to listen on 
const PORT = 3000;

// Define a "default" route for our home page 
app.get('/', (req, res) => {
  res.render('home'); // This renders home.ejs file
});

// Handle form submission
app.post('/submit', (req, res) => {
  console.log(req.body); // Log form data

  const { workoutType, duration, intensity, date, notes } = req.body;
  
  workouts.push({ workoutType, duration, intensity, date, notes });

  res.redirect('/summary'); // Redirect to summary page after submitting
});

// Define a route to display workout summary
app.get('/summary', (req, res) => {
  res.render('summary', { workouts }); // Pass workouts data to summary.ejs
});

// Tell the server to listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
