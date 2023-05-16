import type { Album } from '$lib/types';
import type { PageServerLoad } from './$types';
import type { Asset as ContentfulAsset } from 'contentful';
import { client, formatAsset } from '$lib/utils/contentful';

export const load: PageServerLoad<{ albums: Album[] }> = async () => {
	const albumData = await client.getEntries({
		content_type: 'photos',
		order: ['fields.order']
	});
	const albums: Album[] = albumData.items.map((item) => ({
		name: String(item.fields.album),
		photos: Array.isArray(item.fields.photos)
			? item.fields.photos.map((photo) => formatAsset(photo as ContentfulAsset))
			: []
	}));

	return { albums };
};
