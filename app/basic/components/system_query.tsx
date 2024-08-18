'use client'

import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { runQuery } from './actions'
import { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import ReactMarkdown from 'react-markdown'

function SystemQuery() {
  const { mutate, isPending, data } = useMutation({
    mutationFn: runQuery,
  })

  const [systemMessage, setSystemMessage] = useState('')
  const [userMessage, setUserMessage] = useState('')

  useEffect(() => {
    // Handler function to capture Ctrl + Enter
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault() // Prevent the default action if necessary
        // Add your custom logic here
        if (!isPending && userMessage.length > 3) {
          mutate({ systemMessage, userMessage })
        }
      }
    }

    // Add event listener
    window.addEventListener('keydown', handleKeyDown)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMessage, systemMessage])

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
      {data && (
        <>
          <div className="m-5">
            <ReactMarkdown>{data}</ReactMarkdown>
          </div>
        </>
      )}
    </div>
  )
}

export default SystemQuery
