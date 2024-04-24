import { NextRequest, NextResponse } from 'next/server'
import OpenAPI, { OpenAIError } from 'openai'

// OpenAI API client
const openai = new OpenAPI()

// API response limit
export const config = {
  api: {
    responseLimit: false,
  },
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const prompt = body.prompt

  try {
    // OpenAI APIコール
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '512x512',
      response_format: 'b64_json',
    })

    // 画像取得
    const image = response.data[0].b64_json

    return NextResponse.json({ photo: image })
  } catch (error: any) {
    console.error('Error occurred:', error)

    if (error instanceof OpenAIError) {
      return NextResponse.json({ error: error.code }, { status: error.status })
    } else {
      // Handle other errors
      return NextResponse.error()
    }
  }
}
