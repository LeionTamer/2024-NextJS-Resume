'use server'

import { openai } from '@/lib/openai'

export async function runQuery() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: 'What is the capital of Brazil?',
      },
    ],
  })

  console.table(response.choices[0].message.content)
}
