import { GoogleGenerativeAI } from '@google/generative-ai';

export const GEMINI_API_KEY = 'AIzaSyAXt9BxOIOsp4EwhOq0myFr_OzkzqGD7OY';

export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
export const model = genAI.getGenerativeModel({ model: 'gemini-pro' });