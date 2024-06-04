import { Person } from './persons';
import { Message } from './messages';
export interface Room {
  id: number;
  id_person_1: number;
  id_person_2: number;
  messages: Message[];
}
