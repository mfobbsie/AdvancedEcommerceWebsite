import "@testing-library/jest-dom";
// Polyfill for React Router (TextEncoder/TextDecoder)
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
// Polyfill fetch for Firebase Auth using Node's built-in implementation
const { fetch, Headers, Request, Response } = globalThis;
global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
