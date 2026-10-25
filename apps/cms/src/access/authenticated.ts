import type { Access } from "payload";

import { publishedPostsWhere } from "../published-posts";

export const authenticated: Access = ({ req: { user } }) => Boolean(user);

/**
 * Editors see drafts. Anonymous readers only see Posts that are not drafts.
 * A published Post keeps its public row when a newer draft is saved.
 */
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
	if (user) {
		return true;
	}

	return publishedPostsWhere;
};
