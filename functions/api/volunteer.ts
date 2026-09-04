import { sendNotificationEmail, jsonResponse, type EmailEnv } from './_email';

interface VolunteerPayload {
  name: string;
  email: string;
  skills?: string;
  availability?: string;
  message?: string;
  company?: string; // honeypot
}

export const onRequestPost: PagesFunction<EmailEnv> = async ({ request, env }) => {
  let data: VolunteerPayload;
  try {
    data = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid request body' }, 400);
  }

  if (data.company) {
    return jsonResponse({ ok: true });
  }

  if (!data.name || !data.email) {
    return jsonResponse({ ok: false, error: 'Missing required fields' }, 400);
  }

  try {
    await sendNotificationEmail(env, `New volunteer application from ${data.name}`, [
      ['Name', data.name],
      ['Email', data.email],
      ['Skills', data.skills || 'Not specified'],
      ['Availability', data.availability || 'Not specified'],
      ['Message', data.message || ''],
    ]);
  } catch (err) {
    return jsonResponse({ ok: false, error: 'Failed to submit application' }, 502);
  }

  return jsonResponse({ ok: true });
};
