import express from 'express';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase/firebaseConfig';

// Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Basic endpoint
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

// Endpoint to write to Firestore
app.post('/add', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, "test"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});