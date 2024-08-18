'use client'

import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { runQuery } from './actions'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

function SystemQuery() {
  const { mutate, isPending, data } = useMutation({
    mutationFn: runQuery,
  })

  const [systemMessage, setSystemMessage] = useState('')
  const [userMessage, setUserMessage] = useState('')

  return (
    <div className="flex flex-col gap-5 p-2">
      <div>
        <Label htmlFor="system">System Message</Label>
        <Textarea
          id="system"
          value={systemMessage}
          onChange={(e) => setSystemMessage(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="user">User Message</Label>
        <Textarea
          id="user"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
      </div>
      <div className="flex flex-row-reverse">
        <Button
          disabled={isPending || userMessage.length <= 3}
          onClick={() => {
            mutate({ systemMessage, userMessage })
          }}
        >
          Run Query
        </Button>
      </div>
      {data && <div className="m-5">{data}</div>}
    </div>
  )
}

export default SystemQuery
