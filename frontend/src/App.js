import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrl('');
    try {
      const res = await axios.post('http://localhost:5000/api/shorten', { url });
      setShortUrl(res.data.shortUrl);
    } catch {
      alert('Error shortening URL');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ width: '300px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 12px', marginLeft: '8px' }}>
          Shorten
        </button>
      </form>
      {shortUrl && (
        <p style={{ marginTop: '20px' }}>
          Short URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </p>
      )}
    </div>
  );
}

export default App;
