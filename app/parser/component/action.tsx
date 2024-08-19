'use server'

import { openai } from '@/lib/openai'
import { zodResponseFormat } from 'openai/helpers/zod.mjs'
import { parsedDescriptionSchema } from './type'

export async function parseDescription({
  systemMessage,
  description,
}: {
  systemMessage: string
  description: string
}) {
  try {
    const response = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-2024-08-06',
      messages: [
        {
          role: 'system',
          content: systemMessage,
        },
        {
          role: 'user',
          content: description,
        },
      ],
      response_format: zodResponseFormat(parsedDescriptionSchema, 'parser'),
    })

    const message = response.choices[0].message

    console.table(message.parsed)

    return message.parsed
  } catch (error) {
    console.error(error)
    throw new Error('Failed to parse description')
  }
}
