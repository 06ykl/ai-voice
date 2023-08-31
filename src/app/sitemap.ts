import type { MetadataRoute } from "next";

import { baseURL } from "@aivoice/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: baseURL,
			lastModified: new Date(),
		},
	];
}
