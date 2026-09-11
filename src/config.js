// Dynamic environment configuration loader for Atta Chakki Frontend
// Reads environment variables from .env or falls back to domain-based detection

const DEFAULT_LOCAL_API = "http://localhost/Atta_Chakki_API";
const DEFAULT_PROD_API = "https://suchi-chakki-d602cf9262ad.herokuapp.com";

const DEFAULT_LOCAL_SOCKET = "http://localhost:3001";
const DEFAULT_PROD_SOCKET = "https://socket-server-9b9f3ddbe629.herokuapp.com";

// Dynamic helper: Automatically resolves LAN IP if accessed from mobile/network device
const resolveDynamicHost = (configuredUrl, fallbackDefault) => {
  const urlToUse = configuredUrl || fallbackDefault;
  if (typeof window === 'undefined') return urlToUse;
  
  const currentHost = window.location.hostname;
  // If accessing from a local network IP (e.g. 192.168.x.x, 10.x.x.x, 172.x.x.x)
  if (
    currentHost && 
    currentHost !== 'localhost' && 
    currentHost !== '127.0.0.1' &&
    (currentHost.startsWith('192.168.') || currentHost.startsWith('10.') || currentHost.startsWith('172.'))
  ) {
    return urlToUse.replace(/localhost|127\.0\.0\.1/g, currentHost);
  }
  return urlToUse;
};

// Resolve API URL
export const API_BASE_URL = resolveDynamicHost(
  import.meta.env.VITE_API_URL, 
  DEFAULT_LOCAL_API
);

// Resolve Socket URL
export const SOCKET_URL = resolveDynamicHost(
  import.meta.env.VITE_SOCKET_URL, 
  DEFAULT_LOCAL_SOCKET
);

// Third-party API credentials
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
export const ONESIGNAL_APP_ID = import.meta.env.VITE_ONESIGNAL_APP_ID || "";
