// Add jest-dom matchers
require("@testing-library/jest-dom");

// Polyfill for React Router (TextEncoder/TextDecoder)
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill fetch for Firebase Auth (Node 20+ has fetch built-in)
global.fetch =
  global.fetch ||
  (() => {
    throw new Error("Fetch is not available in this environment.");
  });
global.Headers = global.Headers;
global.Request = global.Request;
global.Response = global.Response;
