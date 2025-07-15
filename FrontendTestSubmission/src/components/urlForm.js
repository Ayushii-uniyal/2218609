import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { Log } from '../LoggingMiddleware/loggingMiddleware';

const URLForm = () => {
  const [url, seturl] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [shortedUrl, setshortedUrl] = useState([]);

  const handleChange = (i, e) => {
    const newurl = [...url];
    newurl[i][e.target.name] = e.target.value;
    seturl(newurl);
  };
  const handleAdd = () => {
    if (url.length < 5) {
      seturl([...url, { longUrl: '', validity: '', shortcode: '' }]);
    }
  };
  const generateShortcode = () => {
    return Math.random().toString(36).substring(2, 8);
  };
  const handleSubmit = async () => {
    const now = new Date();
    const newshortedUrl = [];
    for (const input of url) {
      const { longUrl, validity, shortcode } = input;
      if (!/^https?:\/\/.+/.test(longUrl)) {
        await Log('frontend', 'error', 'component', `Invalid URL: ${longUrl}`);
        continue;
      }

      let code = shortcode || generateShortcode();

      const stored = JSON.parse(localStorage.getItem('shortUrls') || '[]');
      const exists = stored.find((item) => item.shortcode === code);

      if (exists) {
        await Log('frontend', 'warn', 'component', `Shortcode collision: ${code}`);
        continue;
      }

      const expiry = new Date(now.getTime() + ((validity ? parseInt(validity) : 30) * 60000));
      const newItem = {
        shortcode: code,
        longUrl,
        createdAt: now.toISOString(),
        expiry: expiry.toISOString(),
        clicks: []
      };

      stored.push(newItem);
      localStorage.setItem('shortUrls', JSON.stringify(stored));

      await Log('frontend', 'info', 'component', `Short URL created: ${code}`);

      newshortedUrl.push({
        shortUrl: `http://localhost:3000/${code}`,
        expiry: expiry.toLocaleString(),
        longUrl
      });
    }

    setshortedUrl(newshortedUrl);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">URL Shortener</Typography>
      {url.map((input, index) => (
        <Paper key={index} sx={{ p: 2, my: 2 }}>
          <TextField
            fullWidth
            label="Long URL"
            name="longUrl"
            value={input.longUrl}
            onChange={(e) => handleChange(index, e)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Validity (in minutes)"
            name="validity"
            value={input.validity}
            onChange={(e) => handleChange(index, e)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Custom Shortcode (optional)"
            name="shortcode"
            value={input.shortcode}
            onChange={(e) => handleChange(index, e)}
          />
        </Paper>
      ))}
      <Button onClick={handleAdd} sx={{ mr: 2 }}>+ Add</Button>
      <Button variant="contained" onClick={handleSubmit}>Shorten</Button>

      {shortedUrl.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">shortedUrl</Typography>
          {shortedUrl.map((r, i) => (
            <Box key={i}>
              <a href={r.shortUrl}>{r.shortUrl}</a>
              <Typography variant="body2">Expires at: {r.expiry}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default URLForm;
