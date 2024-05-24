import { Person } from './persons';
import { Message } from './messages';
export interface Room {
  id: number;
  id_person_1: number;
  id_person_2: number;
  messages: Message[];
}

export const rooms: Room[] = [
  {
    id: 100,
    id_person_1: 1,
    id_person_2: 2,
    messages: [],
  },
  {
    id: 101,
    id_person_1: 1,
    id_person_2: 3,
    messages: [],
  },
  {
    id: 102,
    id_person_1: 1,
    id_person_2: 4,
    messages: [],
  }
];
