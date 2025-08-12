// This is the Netlify Function that acts as a secure backend.
// File path should be: /netlify/functions/youtube.js

// fetch is available with Node.js 18+ on Netlify
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Get the search query and page token from the frontend request
  const { query, pageToken } = event.queryStringParameters;

  // Securely get the API Key from Netlify's environment variables
  const API_KEY = process.env.YOUTUBE_API_KEY;

  // Construct the full YouTube API URL
  const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoLicense=any&maxResults=20&key=${API_KEY}&pageToken=${pageToken || ''}`;

  try {
    // Call the YouTube API
    const response = await fetch(API_URL);
    const data = await response.json();

    // Send the successful response back to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // If there's an error, send an error message back
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data from YouTube' }),
    };
  }
};
