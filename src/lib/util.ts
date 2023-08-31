import type { TimerOptions } from "node:timers";
import { promisify } from "util";

import type { RequestBody, ResponseBody } from "@aivoice/types";

import { completionURL } from "./constants";

/**
 * Appends a class to `className` if a certain condition is met.
 * @param {{ condition: boolean; className: string; }[]} classes Array of classes and their conditions
 * @param {string} className The base class(es) to apply the conditional classes to
 * @returns
 */
export function conditionalClass(
	classes: { condition: boolean; className: string }[],
	className: string
): string {
	classes.forEach((c: { condition: boolean; className: string }): void => {
		if (c.condition) className = className + " " + c.className;
	});

	return className;
}

/**
 * Generates a request body to send to the chat completion API.
 * @param {string} prompt The message to send
 * @returns
 */
export function generateBody(prompt: string): string {
	const body: RequestBody = {
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: prompt }],
	};

	return JSON.stringify(body);
}

/**
 * Fetches the response from the chat completion API.
 * @param {string} finalTranscript From `useSpeechRecognition()` from `react-speech-recognition`
 * @returns
 */
export async function getResponse(finalTranscript: string): Promise<string> {
	return await fetch(completionURL, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		method: "POST",
		body: generateBody(finalTranscript),
	})
		.then((res: Response): Promise<ResponseBody> => res.json())
		.then((json: ResponseBody): string => {
			console.log(json);
			return "";
		})
		.catch((error: Error): string => {
			console.error(error);
			return "";
		});
}

/**
 * Useful wait function for delaying code execution.
 * @param {number | undefined} delay The amount of time to delay in ms
 * @param {any | undefined} value
 * @param {TimerOptions | undefined} options
 */
export const wait: <T = void>(
	delay?: number | undefined,
	value?: T | undefined,
	options?: TimerOptions | undefined
) => Promise<T> = promisify(setTimeout);
