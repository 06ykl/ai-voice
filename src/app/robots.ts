import type { MetadataRoute } from "next";

import { baseURL, host } from "@aivoice/lib/constants";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: `${baseURL}/sitemap.xml`,
		host,
	};
}
