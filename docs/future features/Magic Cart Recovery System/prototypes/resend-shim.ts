// Prototype Resend shim (not wired).
export type SendEmailInput = { to: string; subject: string; html: string }

export async function sendEmail(input: SendEmailInput) {
  // In real impl, import Resend client and call .emails.send()
  return { id: 'mock-email', ...input }
}
