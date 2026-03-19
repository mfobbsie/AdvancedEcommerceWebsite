import "@testing-library/jest-dom";

// Polyfill for React Router (TextEncoder/TextDecoder)
import { TextEncoder, TextDecoder } from "util";
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Polyfill fetch for Firebase Auth using Node's built-in implementation
const { fetch, Headers, Request, Response } = globalThis;
(global as any).fetch = fetch;
(global as any).Headers = Headers;
(global as any).Request = Request;
(global as any).Response = Response;
