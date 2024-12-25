import { Message } from './message';

export interface GptResponse {
  id?: string;
  object?: string;
  created?: number;
  model: string;
  choices: {
    index?: number;
    message: Message;
    logprobs?: any;
    finish_reason?: string;
  }[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  system_fingerprint?: any;
}
