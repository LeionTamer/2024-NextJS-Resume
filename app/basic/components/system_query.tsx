'use client'

import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { runQuery } from './actions'
import { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import ReactMarkdown from 'react-markdown'
import { useCtrlEnter } from '@/hooks/useCtrlEnter'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  presetMap,
  systemOptions,
  SystemOptionType,
} from './system_query_types'

function SystemQuery() {
  const { mutate, isPending, data } = useMutation({
    mutationFn: runQuery,
  })

  const [preset, setPreset] = useState<SystemOptionType>('none')
  const [systemMessage, setSystemMessage] = useState('')
  const [userMessage, setUserMessage] = useState('')

  function handleQuery() {
    if (!isPending && userMessage.length > 3) {
      mutate({ systemMessage, userMessage })
    }
  }

  useCtrlEnter(handleQuery)

  return (
    <div className="flex flex-col gap-5 p-2">
      <div>
        <Label>Cats</Label>
        <Select
          value={preset}
          onValueChange={(e) => {
            setPreset(e as SystemOptionType)
            setSystemMessage(presetMap[e as SystemOptionType])
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {systemOptions.map((key) => (
              <SelectItem key={key} value={key}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
