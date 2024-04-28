import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

// Initialize the OpenAI API client with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Function to generate images based on a text prompt
async function generateImage(prompt: string) {
  try {
    // Call the OpenAI Images API to generate an image
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    // Extract the URL of the generated image from the response
    const imageUrl = response.data[0].url;

    // Return the URL of the generated image
    return imageUrl;
  } catch (error) {
    // Handle any errors that occur during image generation
    console.error("Error generating image:", error);
    throw error;
  }
}

// Handler function for POST requests to the /api/dalle endpoint
export async function POST(request: NextRequest) {
  try {
    // Get prompt from request body
    const requestBody = await request.json();
    const prompt = requestBody.prompt;

    // Call the function to generate the image
    const imageUrl = await generateImage(prompt);

    // Return a JSON response containing the URL of the generated image
    return NextResponse.json({ imageUrl });
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error handling request:", error);
    return NextResponse.error();
  }
}
