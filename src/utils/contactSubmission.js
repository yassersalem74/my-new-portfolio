import contact from '../data/contact.json'

export const contactEndpoint = `https://formsubmit.co/ajax/${contact.email}`

export function createContactPayload(fields) {
  return {
    name: fields.name.trim(),
    email: fields.email.trim(),
    subject: fields.subject.trim(),
    message: fields.message.trim(),
    _subject: `Portfolio inquiry: ${fields.subject.trim()}`,
    _replyto: fields.email.trim(),
    _template: 'table',
    _honey: fields._honey || '',
  }
}

export async function submitContactMessage(fields, signal) {
  const response = await fetch(contactEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(createContactPayload(fields)),
    signal,
  })
  const result = await response.json()
  if (!response.ok || !(result.success === true || result.success === 'true')) throw new Error('SUBMISSION_FAILED')
  if (/activat|verif|confirm|check (?:your|the) email/i.test(result.message || '')) throw new Error('DELIVERY_NOT_ACTIVATED')
  return result
}
