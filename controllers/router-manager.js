require('dotenv').config();
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// landing page
router.get(`/`, (req, res) => {
  return res.render(`pages/index`, {
    title: "Home"
  });
});

router.get(`/join`, (req, res) => {
  return res.render(`pages/join`, {
    title: "Join"
  });
});

router.post('/join', async (req, res) => {

  const url = process.env.MONGO_DB_URL;
  const dbName = process.env.MONGO_DB_NAME;

  if (!url || !dbName) {
    return res.status(500).render('error', { title: 'Internal Server Error', message: 'Server misconfigured' });
  }

  const client = new MongoClient(url);

  try {

    await client.connect(); // <-- All errors here will be caught in try/catch
    const db = client.db(dbName);
    const collection = db.collection('waitlist');
    const result = await collection.insertOne(req.body);
    console.log('Inserted ID:', result.insertedId);
    await client.close();
    return res.redirect('/thankyou');

  } catch (err) {

    console.error('Database operation failed:', err);
    await client.close().catch(console.error); // Safe close
    return res.status(500).render('error', { title: 'Internal Server Error', message: 'Something went wrong. Please try again.' });
  }

});

router.get(`/thankyou`, (req, res) => {
  return res.render(`pages/thankyou`, {
    title: "Thank You"
  });
});

// 404 error handler
router.use((req, res, next) => {
  res.status(404).render('404', {
    title: '404 - Page Not Found'
  });
});

// custom error handler
router.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  console.error(err);
  res.status(statusCode).render('error', {
    title: 'Internal Server Error',
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {
      message: "Internal Server Error"
    }
  });
});


module.exports = router;

