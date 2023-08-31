import "./globals.css";
import { Inter } from "next/font/google";

import type { MetaData, NextFont, PropsWithChildren } from "@aivoice/types";

import packageJSON from "../../package.json";

const inter: NextFont = Inter({ subsets: ["latin"] });

export const metadata: MetaData = {
	title: "AIVoice",
	description: packageJSON.description,
};

export default function RootLayout({
	children,
}: PropsWithChildren): JSX.Element {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
