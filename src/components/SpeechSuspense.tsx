import { useEffect, useState } from "react";

import type {
	NextComponent,
	PropsWithChildren,
	State,
	UseSpeechRecognition,
} from "@aivoice/types";

import Loader from "./loader/Loader";

export type SpeechSuspenseProps = PropsWithChildren<{
	data: UseSpeechRecognition;
}>;

const SpeechSuspense: NextComponent<SpeechSuspenseProps> = ({
	children,
	data,
}: SpeechSuspenseProps): JSX.Element => {
	const [speechRecognitionSupported, setSpeechRecognitionSupported]: State<
		boolean | null
	> = useState<boolean | null>(null);
	const {
		browserSupportsSpeechRecognition,
		isMicrophoneAvailable,
	}: UseSpeechRecognition = data;

	useEffect((): void => {
		setSpeechRecognitionSupported(browserSupportsSpeechRecognition);
	}, [browserSupportsSpeechRecognition]);

	if (speechRecognitionSupported === null) return <Loader />;

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn&apos;t support speech recognition.</span>;
	}

	if (!isMicrophoneAvailable) {
		return <span>Please enable your microphone.</span>;
	}

	return <>{children}</>;
};

export default SpeechSuspense;
