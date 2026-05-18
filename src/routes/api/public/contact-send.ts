import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { supabaseAdmin } from '@/integrations/supabase/client.server'

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_mail/gmail/v1'
const TO_EMAIL = 'BeatrizNatalia284@gmail.com'

const Schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(5000),
})

function encodeRfc2822({ to, subject, replyTo, text }: { to: string; subject: string; replyTo: string; text: string }) {
  const lines = [
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 8bit',
    '',
    text,
  ].join('\r\n')
  return Buffer.from(lines, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export const Route = createFileRoute('/api/public/contact-send')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const json = await request.json()
          const parsed = Schema.safeParse(json)
          if (!parsed.success) {
            return new Response(JSON.stringify({ error: 'invalid_input' }), { status: 400 })
          }
          const { name, email, message } = parsed.data

          // Save to DB (best-effort)
          try {
            await supabaseAdmin.from('contact_submissions').insert({ name, email, message })
          } catch (e) {
            console.error('DB insert failed', e)
          }

          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY
          const GOOGLE_MAIL_API_KEY = process.env.GOOGLE_MAIL_API_KEY
          if (!LOVABLE_API_KEY || !GOOGLE_MAIL_API_KEY) {
            return new Response(JSON.stringify({ error: 'email_not_configured' }), { status: 500 })
          }

          const when = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
          const text = [
            'Nova mensagem recebida pelo formulário do portfólio.',
            '',
            `Nome: ${name}`,
            `E-mail: ${email}`,
            `Data/hora: ${when} (BRT)`,
            '',
            'Mensagem:',
            message,
          ].join('\n')

          const raw = encodeRfc2822({
            to: TO_EMAIL,
            subject: 'Novo contato recebido pelo portfólio',
            replyTo: `${name} <${email}>`,
            text,
          })

          const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              'X-Connection-Api-Key': GOOGLE_MAIL_API_KEY,
            },
            body: JSON.stringify({ raw }),
          })

          if (!res.ok) {
            const body = await res.text()
            console.error('Gmail send failed', res.status, body)
            return new Response(JSON.stringify({ error: 'send_failed' }), { status: 502 })
          }

          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        } catch (err) {
          console.error('contact-send error', err)
          return new Response(JSON.stringify({ error: 'server_error' }), { status: 500 })
        }
      },
    },
  },
})
