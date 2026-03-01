const SALT = 'daily-paritta-salt-v1'

export async function hashPasscode(passcode: string): Promise<string> {
  const data = new TextEncoder().encode(passcode + SALT)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPasscode(passcode: string): Promise<boolean> {
  const storedHash = import.meta.env.VITE_APP_PASSCODE_HASH
  if (!storedHash) {
    console.warn('No passcode hash configured. Passcode gate disabled.')
    return true
  }

  const inputHash = await hashPasscode(passcode)
  return inputHash === storedHash
}

export function formatLockoutTime(lockoutUntil: number): string {
  const remaining = Math.max(0, lockoutUntil - Date.now())
  const minutes = Math.floor(remaining / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function isPasscodeEnabled(): boolean {
  return !!import.meta.env.VITE_APP_PASSCODE_HASH
}
