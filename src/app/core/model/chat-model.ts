import { Message } from './message';

export interface Chat {
  model: string;
  messages: Message[];
  temperature?: number;
}
