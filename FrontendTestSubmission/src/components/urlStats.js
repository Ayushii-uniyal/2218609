import { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Log } from '../LoggingMiddleware/loggingMiddleware';

const URLStats = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('shortUrls') || '[]');
    setUrls(data);
    Log('frontend', 'info', 'page', 'Statistics page loaded');
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>URL Stats</Typography>
      {urls.length === 0 && <Typography>No URLs yet.</Typography>}
      {urls.map((u, idx) => (
        <Paper key={idx} sx={{ p: 2, my: 2 }}>
          <Typography><strong>Short URL:</strong> <a href={`/${u.shortcode}`}>http://localhost:3000/{u.shortcode}</a></Typography>
          <Typography><strong>Original:</strong> {u.longUrl}</Typography>
          <Typography><strong>Created At:</strong> {new Date(u.createdAt).toLocaleString()}</Typography>
          <Typography><strong>Expires At:</strong> {new Date(u.expiry).toLocaleString()}</Typography>
          <Typography><strong>Total Clicks:</strong> {u.clicks.length}</Typography>
          <Typography sx={{ mt: 1 }}><strong>Click Details:</strong></Typography>
          {u.clicks.map((c, i) => (
            <Typography key={i} variant="body2" sx={{ ml: 2 }}>
              - [{new Date(c.timestamp).toLocaleString()}] from {c.source} ({c.location})
            </Typography>
          ))}
        </Paper>
      ))}
    </Box>
  );
};

export default URLStats;
