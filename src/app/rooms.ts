import { Person } from './persons';
import { Message } from './messages';
export interface Room {
  id: number;
  id_person_1: number;
  id_person_2: number;
}

export const rooms = [
  {
    id_room: 100,
    id_person_1: 1,
    id_person_2: 2
  },
  {
    id_room: 101,
    id_person_1: 1,
    id_person_2: 3
  },
  {
    id_room: 102,
    id_person_1: 1,
    id_person_2: 4
  }
];
