import { sendNotificationEmail, jsonResponse, type EmailEnv } from './_email';

interface ContactPayload {
  name: string;
  email: string;
  reason: string;
  message: string;
  company?: string; // honeypot
}

export const onRequestPost: PagesFunction<EmailEnv> = async ({ request, env }) => {
  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid request body' }, 400);
  }

  if (data.company) {
    // Honeypot field was filled in by a bot — pretend success, do nothing.
    return jsonResponse({ ok: true });
  }

  if (!data.name || !data.email || !data.message) {
    return jsonResponse({ ok: false, error: 'Missing required fields' }, 400);
  }

  try {
    await sendNotificationEmail(env, `New contact message from ${data.name}`, [
      ['Name', data.name],
      ['Email', data.email],
      ['Reason', data.reason || 'General Inquiry'],
      ['Message', data.message],
    ]);
  } catch (err) {
    return jsonResponse({ ok: false, error: 'Failed to send message' }, 502);
  }

  return jsonResponse({ ok: true });
};
