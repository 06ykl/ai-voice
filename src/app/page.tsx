"use client";

import "regenerator-runtime";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

import { Icon } from "@aivoice/components/Next";
import SpeechSuspense from "@aivoice/components/SpeechSuspense";
import { conditionalClass, getResponse } from "@aivoice/lib/util";
import type { State, UseSpeechRecognition } from "@aivoice/types";

export default function Home(): JSX.Element {
	const [response, setResponse]: State<string> = useState<string>("");
	const speechState: UseSpeechRecognition = useSpeechRecognition();

	return (
		<SpeechSuspense data={speechState}>
			<div className="w-full h-screen flex justify-center items-center">
				<span
					className="relative flex h-48 w-48 cursor-pointer justify-center items-center"
					onClick={(): void => {
						if (!speechState.listening)
							SpeechRecognition.startListening();
						else {
							SpeechRecognition.stopListening();

							getResponse(speechState.finalTranscript)
								.then((res: string) => {
									setResponse(res);
									speechState.resetTranscript();
								})
								.catch((reason: any): void => {
									console.error(reason);
									speechState.resetTranscript();

									// Handle on client side
								});
						}
					}}
				>
					<span
						className={conditionalClass(
							[
								{
									condition: speechState.listening,
									className: "animate-ping",
								},
							],
							"absolute inline-flex h-full w-full rounded-full bg-gray-200 opacity-75"
						)}
					></span>
					<span className="relative inline-flex justify-center items-center rounded-full h-48 w-48 bg-blurple text-white">
						<Icon className="h-[30%] w-[30%]" icon={faMicrophone} />
					</span>
				</span>
			</div>

			<span>{response}</span>
		</SpeechSuspense>
	);
}
