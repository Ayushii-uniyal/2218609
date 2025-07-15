import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Log } from '../LoggingMiddleware/loggingMiddleware';

const Redirect = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('shortUrls') || '[]');
    const match = stored.find((item) => item.shortcode === shortcode);
    if (!match) {
      Log('frontend', 'error', 'page', `Shortcode not found: ${shortcode}`);
      navigate('/');
      return;
    }

    const now = new Date();
    if (new Date(match.expiry) < now) {
      Log('frontend', 'warn', 'page', `Link expired: ${shortcode}`);
      navigate('/');
      return;
    }

    const click = {
      timestamp: now.toISOString(),
      source: document.referrer || 'direct',
      location: 'India'  
    };

    match.clicks.push(click);
    const updated = stored.map((item) => item.shortcode === shortcode ? match : item);
    localStorage.setItem('shortUrls', JSON.stringify(updated));

    Log('frontend', 'info', 'page', `Redirecting to: ${match.longUrl}`);
    window.location.href = match.longUrl;
  }, [shortcode, navigate]);

  return null;
};

export default Redirect;
