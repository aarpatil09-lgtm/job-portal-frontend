// // import './config/instrument.js';

// // import express from 'express'
// // import cors from 'cors'
// // import 'dotenv/config'
// // import connectDB from './config/db.js'


// // //Initialize Express
// // const app = express()

// // //connect to database
// // //await connectDB()

// // //Middlewares
// // app.use(cors())
// // app.use(express.json())

// // //Routes
// // app.get('/',(req,res)=>res.send("API Working"))

// // //port
// // const PORT = process.env.PORT || 5000

// // app.listen(PORT,()=>{
// //     console.log(`Server is running on port ${PORT}`);
// // })
// import './config/instrument.js';
// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/db.js';

// // Initialize Express
// const app = express();

// // Connect to database safely (minimal change)
// try {
//     await connectDB(); // same logic as your original code
// } catch (err) {
//     console.error("Database connection failed:", err);
//     process.exit(1); // stop server if DB fails
// }

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Routes
// app.get('/', (req, res) => res.send("API Working"));
// app.get("/debug-sentry",function mainHandler(req,res){
//     throw new Error("My first Sentry error!");
// });

// // Port
// const PORT = process.env.PORT || 5000;

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
import './config/instrument.js';
import * as Sentry from "@sentry/node";   // ✅ added
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import { clerkWebhooks } from './controllers/webhooks.js';

// Initialize Express
const app = express();

// Connect to database safely (same logic)
try {
    await connectDB();
} catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
}

// Middlewares
app.use(Sentry.Handlers.requestHandler()); // ✅ added
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API Working"));
// app.get("/debug-sentry", function mainHandler(req, res) {
//     throw new Error("My first Sentry error!");
// });
// app.get('/debug-sentry', (req, res) => {
//   try {
//     throw new Error('Test Sentry error!');
//   } catch (err) {
//     Sentry.captureException(err);
//     res.status(500).send('Error captured!');
//   }
// });
// app.post('/webhooks',clerkWebhooks)

// Routes
app.get('/', (req, res) => res.send("API Working"));

app.get('/debug-sentry', (req, res) => {
  try {
    throw new Error('Test Sentry error!');
  } catch (err) {
    Sentry.captureException(err);
    res.status(500).send('Error captured!');
  }
});

app.post('/webhooks', clerkWebhooks);

// Add GitHub callback route here
app.get('/auth/github/callback', async (req, res) => {
    const code = req.query.code;
    console.log('GitHub code received:', code);

    // TODO: Exchange 'code' for access token with GitHub API

    res.send('GitHub code received! You can close this tab.');
});

// ✅ added (must be after routes)
app.use(Sentry.Handlers.errorHandler());

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
