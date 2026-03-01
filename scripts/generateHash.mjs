#!/usr/bin/env node

import { createHash } from 'crypto'

const SALT = 'daily-paritta-salt-v1'

function hashPasscode(passcode) {
  const data = passcode + SALT
  return createHash('sha256').update(data).digest('hex')
}

const passcode = process.argv[2]

if (!passcode) {
  console.error('Usage: npm run generate-passcode-hash -- <passcode>')
  console.error('Example: npm run generate-passcode-hash -- 1234')
  process.exit(1)
}

if (!/^\d{4}$/.test(passcode)) {
  console.warn('Warning: Passcode should be 4 digits for the PIN input to work correctly.')
}

const hash = hashPasscode(passcode)

console.log('\n=== Passcode Hash Generator ===\n')
console.log(`Passcode: ${passcode}`)
console.log(`Hash: ${hash}`)
console.log('\nAdd this to your .env file:')
console.log(`VITE_APP_PASSCODE_HASH=${hash}`)
console.log('')
