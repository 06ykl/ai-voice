import type { NextComponentType } from "next";
import type { NextFont } from "next/dist/compiled/@next/font";
import type { Attributes, CSSProperties, ReactNode } from "react";

// #region Next Types
export type NextComponent<P = {}, IP = {}> = NextComponentType<
	BaseContext,
	IP,
	P
>;
// #endregion

// #region Props
export type Props<P = undefined> = P extends object
	? Attributes & P
	: Attributes;

export type PropsWithChildren<P = undefined> = P extends object
	? Props<
			{
				children: ReactNode;
			} & P
	  >
	: Props<{
			children: ReactNode;
	  }>;

export type StyleProps<P = undefined> = P extends object
	? Props<
			{
				className?: string;
				id?: string;
				style?: CSSProperties;
			} & P
	  >
	: Props<{
			className?: string;
			id?: string;
			style?: CSSProperties;
	  }>;

export type StylePropElement = ({
	className,
	id,
	style,
}: StyleProps) => JSX.Element;
// #endregion

// #region Local Types

/**
 * Chat completion request body message.
 */
interface Message {
	/**
	 * The role of the author of this message. One of `system`, `user`, or `assistant`.
	 */
	role: "system" | "user" | "assistant";

	/**
	 * The contents of the message.
	 */
	content: string;

	/**
	 * The name of the author of this message. May contain a-z, A-Z,
	 * 0-9, and underscores, with a maximum length of 64
	 *  characters.
	 */
	name?: string;
}

/**
 * ChatGPT model types.
 */
type Model =
	| "gpt-4"
	| "gpt-4-0314"
	| "gpt-4-32k"
	| "gpt-4-32k-0314"
	| "gpt-3.5-turbo"
	| "gpt-3.5-turbo-0301"
	| "text-davinci-003"
	| "text-davinci-002"
	| "code-davinci-002"
	| "whisper-1"
	| "text-moderation-latest"
	| "text-moderation-stable"
	| "text-curie-001"
	| "text-babbage-001"
	| "text-ada-001"
	| "davinci"
	| "curie"
	| "babbage"
	| "ada";

// #endregion

// #region Exports

/**
 * Next.js metadata API options.
 * @exports
 */
interface MetaData {
	/** The title of the page. */
	title: string;
	/** The description of the page. */
	description: string;
}

/**
 * React component prop type for children.
 * @exports
 */
type PropsWithChildren<T = {}> = T & {
	children: React.ReactNode;
};

/**
 * Request body to send to the chat completions endpoint for the OpenAI API.
 * @exports
 */
interface RequestBody {
	/**
	 * ID of the model to use. You can use the [**List models API**](https://platform.openai.com/docs/api-reference/models/list) to see
	 * all of your available models, or see our [**Model overview**](https://platform.openai.com/docs/models/overview)
	 * for descriptions of them.
	 */
	model: Model;

	/**
	 * A list of messages describing the conversation so far.
	 */
	messages: Message[];

	/**
	 * What sampling temperature to use, between 0 and 2.
	 * Higher values like 0.8 will make the output more random, while lower
	 * values like 0.2 will make it more focused and deterministic.
	 *
	 * We generally recommend altering this or `top_p` but not both.
	 */
	temperature?: number;

	/**
	 * An alternative to sampling with temperature, called nucleus
	 * sampling, where the model considers the results of the tokens
	 * with top_p probability mass. So 0.1 means only the tokens
	 * comprising the top 10% probability mass are considered.
	 *
	 * We generally recommend altering this or `temperature` but not both.
	 */
	top_p?: number;

	/**
	 * How many completions to generate for each prompt.
	 *
	 * **Note:** Because this parameter generates many completions, it can
	 * quickly consume your token quota. Use carefully and ensure that
	 * you have reasonable settings for `max_tokens` and `stop`.
	 */
	n?: number;

	/**
	 * Whether to stream back partial progress. If set, tokens will be sent
	 * as data-only [**server-sent events**](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available, with
	 * the stream terminated by a `data: [DONE]` message.
	 */
	stream?: boolean;

	/**
	 * Up to 4 sequences where the API will stop generating further
	 * tokens. The returned text will not contain the stop sequence.
	 */
	stop?: string | any[] | null;

	/**
	 * The maximum number of [**tokens**](https://platform.openai.com/tokenizer) to generate in the chat
	 * completion.

	 * The total length of input tokens and generated tokens is limited by
	 * the model's context length.
	 */
	max_tokens?: number;

	/**
	 * Number between -2.0 and 2.0. Positive values penalize new tokens
	 * based on whether they appear in the text so far, increasing the
	 * model's likelihood to talk about new topics.
	 *
	 * [**See more information about frequency and presence penalties.**](https://platform.openai.com/docs/api-reference/parameter-details)
	 */
	presence_penalty?: number;

	/**
	 * Number between -2.0 and 2.0. Positive values penalize new tokens
	 * based on whether they appear in the text so far, decreasing the
	 * model's likelihood to repeat the same line verbatim.
	 *
	 * [**See more information about frequency and presence penalties.**](https://platform.openai.com/docs/api-reference/parameter-details)
	 */
	frequency_penalty?: number;

	/**
	 * Modify the likelihood of specified tokens appearing in the
	 * completion.

	 * Accepts a json object that maps tokens (specified by their token
	 * ID in the GPT tokenizer) to an associated bias value from -100 to
	 * 100. You can use this [**tokenizer tool**](https://platform.openai.com/tokenizer?view=bpe) (which works for both GPT-2
	 * and GPT-3) to convert text to token IDs. Mathematically, the bias is
	 * added to the logits generated by the model prior to sampling. The
	 * exact effect will vary per model, but values between -1 and 1 should
	 * decrease or increase likelihood of selection; values like -100 or 100
	 * should result in a ban or exclusive selection of the relevant token.
	 *
	 * As an example, you can pass `{"50256": -100}` to prevent the
	 * <|endoftext|> token from being generated.
	 */
	logit_bias?: Map | null;

	/**
	 * A unique identifier representing your end-user, which can help
	 * OpenAI to monitor and detect abuse. [**Learn more**](https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids).
	 */
	user?: string;
}

/**
 * Response body received by the chat completions endpoint for the OpenAI API.
 * @exports
 */
interface ResponseBody {
	id: string;
	object: string;
	created: number | bigint;
	choices: {
		index: number;
		message: Message;
		finish_reason: string;
	}[];
	usage: {
		prompt_tokens: string;
		completion_tokens: string;
		total_tokens: string;
	};
}

/**
 * Response from `react-speech-recognition` `useSpeechRecognition()` function.
 * @exports
 */
interface UseSpeechRecognition {
	transcript: string;
	interimTranscript: string;
	finalTranscript: string;
	listening: boolean;
	resetTranscript: () => void;
	browserSupportsSpeechRecognition: boolean;
	isMicrophoneAvailable: boolean;
}

/**
 * React `useState` return type.
 * @exports
 */
type State<T = any> = [T, React.Dispatch<React.SetStateAction<T>>];

// #endregion

export {
	MetaData,
	NextFont,
	PropsWithChildren,
	RequestBody,
	ResponseBody,
	State,
	UseSpeechRecognition,
};
