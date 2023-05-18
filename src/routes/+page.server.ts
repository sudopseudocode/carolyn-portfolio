import getProjects from '$lib/utils/getProjects';

export async function load() {
	const projects = await getProjects();
	return { projects };
}