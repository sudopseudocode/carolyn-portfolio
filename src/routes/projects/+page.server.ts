import type { Project, ProjectType } from '$lib/types';
import type { Asset as ContentfulAsset } from 'contentful';
import { client, formatAsset } from '$lib/contentful/utils';

export async function load() {
	const projectData = await client.getEntries({
		content_type: 'project',
		order: ['fields.order']
	});
	const projects: Project[] = projectData.items.map((item) => ({
		id: String(item.sys.id),
		coverImage: formatAsset(item.fields.coverImage as ContentfulAsset),
		title: String(item.fields.title),
		description: String(item.fields.description),
		role: String(item.fields.role),
		link: String(item.fields.link),
		summary: String(item.fields.summary),
		projectType: item.fields.projectType as ProjectType[]
	}));

	return { projects };
}
