import { sendNotificationEmail, jsonResponse, type EmailEnv } from './email';

interface NewsletterPayload {
  email: string;
  company?: string; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function handleNewsletter(request: Request, env: EmailEnv): Promise<Response> {
  let data: NewsletterPayload;
  try {
    data = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid request body' }, 400);
  }

  if (data.company) {
    return jsonResponse({ ok: true });
  }

  if (!data.email || !EMAIL_RE.test(data.email)) {
    return jsonResponse({ ok: false, error: 'Please enter a valid email address' }, 400);
  }

  try {
    await sendNotificationEmail(env, 'New newsletter signup', [['Email', data.email]]);
  } catch {
    return jsonResponse({ ok: false, error: 'Failed to subscribe' }, 502);
  }

  return jsonResponse({ ok: true });
}
