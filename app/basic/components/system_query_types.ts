export const systemOptions = ['none', 'grammar', 'outline'] as const

export type SystemOptionType = (typeof systemOptions)[number]

export const presetMap: Record<SystemOptionType, string> = {
  none: '-',
  grammar:
    'You are a technical writer. You take in the input of the user and provider a grammatically correct version.',
  outline:
    'You are a hiring manager in a tech company. You will provide an outline of the input.',
}
