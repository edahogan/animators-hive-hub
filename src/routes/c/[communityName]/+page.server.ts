import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { comm_by_slug, insert_message, list_anims, list_messages, sql } from '$lib/server/db';

export const load: PageServerLoad = async ({ params, locals, url, platform }) => {
	const d = sql(platform);
	const c = await comm_by_slug(d, params.communityName, locals.user?.id);
	if (!c) error(404, 'community not found');
	const s: 'new' | 'top' = url.searchParams.get('sort') === 'top' ? 'top' : 'new';
	return {
		c,
		a: await list_anims(d, { sort: s, community_id: c.id, viewer: locals.user?.id }),
		s,
		messages: c.j ? await list_messages(d, c.id) : []
	};
};

export const actions: Actions = {
	message: async ({ params, locals, platform, request }) => {
		if (!locals.user) return fail(401, { message_error: 'sign in and join to send a message' });
		const d = sql(platform);
		const c = await comm_by_slug(d, params.communityName, locals.user.id);
		if (!c) error(404, 'community not found');
		const content = String((await request.formData()).get('content') || '').trim();
		if (!content || content.length > 2000)
			return fail(400, { message_error: 'enter a message of up to 2000 characters' });
		if (!(await insert_message(d, c.id, locals.user.id, content)))
			return fail(403, { message_error: 'join this community first' });
		return { sent: true };
	}
};
