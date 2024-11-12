import { default as base } from '@local/eslint-config/react'

const config = [
  {
    ignores: ['src/payload.types.ts'],
    name: 'Ignore Payload types',
  },
  ...base,
]

export default config