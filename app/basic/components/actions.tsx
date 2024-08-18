'use server'

import { openai } from '@/lib/openai'

export async function runQuery({
  systemMessage,
  userMessage,
}: {
  systemMessage: string
  userMessage: string
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemMessage },
      {
        role: 'user',
        content: userMessage,
      },
    ],
  })

  return response.choices[0].message.content
}
