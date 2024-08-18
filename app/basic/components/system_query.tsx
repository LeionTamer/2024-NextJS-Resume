'use client'

import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { openai } from '@/lib/openai'
import { runQuery } from './actions'

function SystemQuery() {
  const { mutate, isPending } = useMutation({
    mutationFn: runQuery,
  })

  return (
    <div>
      <h1>System Query</h1>
      <Button
        disabled={isPending}
        onClick={() => {
          mutate()
        }}
      >
        Run Query
      </Button>
    </div>
  )
}

export default SystemQuery
