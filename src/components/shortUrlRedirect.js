import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from "../config";

const baseUrl = config.Api.baseUrl;

const ShortUrlRedirect = () => {
  const { shortUrlId } = useParams();

  useEffect(() => {
    // Redirect to the backend URL within the same window
    window.location.href = `${baseUrl}/api/${shortUrlId}`;
  }, [shortUrlId]);

  return null;
};

export default ShortUrlRedirect;