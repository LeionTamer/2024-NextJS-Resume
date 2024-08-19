'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { parseDescription } from './action'
import ReactMarkdown from 'react-markdown'
import { useCtrlEnter } from '@/hooks/useCtrlEnter'
import { defaultSystemMessage } from './type'

export function JobDescription() {
  const [systemMessage, setSystemMessage] = useState(defaultSystemMessage)
  const [description, setDescription] = useState('')

  const { mutate, isPending, data } = useMutation({
    mutationFn: parseDescription,
  })

  function handleGenerate() {
    if (!isPending || description.length > 3) {
      mutate({ description, systemMessage })
    }
  }

  useCtrlEnter(handleGenerate)

  return (
    <>
      <div className="flex flex-col gap-5 p-2">
        <div>
          <Label htmlFor="system">System Message</Label>
          <Textarea
            disabled={isPending}
            className="h-72"
            id="system"
            value={systemMessage}
            onChange={(e) => setSystemMessage(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            disabled={isPending}
            className="h-72"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Button
            disabled={isPending || description.length <= 3}
            onClick={() => handleGenerate()}
          >
            Generate
          </Button>
        </div>
        {!!data && (
          <div>
            <ReactMarkdown>{JSON.stringify(data)}</ReactMarkdown>
          </div>
        )}
      </div>
    </>
  )
}
