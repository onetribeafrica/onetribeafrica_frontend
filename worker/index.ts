import { handleContact } from './contact';
import { handleVolunteer } from './volunteer';
import type { EmailEnv } from './email';

export interface Env extends EmailEnv {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/api/contact') {
      return handleContact(request, env);
    }

    if (request.method === 'POST' && url.pathname === '/api/volunteer') {
      return handleVolunteer(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
