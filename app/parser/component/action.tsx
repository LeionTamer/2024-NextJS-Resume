'use server'

import { openai } from '@/lib/openai'

export async function parseDescription({
  description,
}: {
  description: string
}) {
  const response = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-2024-08-06',
    messages: [
      {
        role: 'system',
        content: description,
      },
    ],
  })

  return response.choices[0].message.content
}
