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
    id: 112,
    id_person_1: 1,
    id_person_2: 2,
    messages: [],

  },
  {
    id: 113,
    id_person_1: 1,
    id_person_2: 3,
    messages: [],

  },
  {
    id: 114,
    id_person_1: 1,
    id_person_2: 4,
    messages: [],

  },
  {
    id: 115,
    id_person_1: 1,
    id_person_2: 5,
    messages: [],

  },
  // {
  //   id: 123,
  //   id_person_1: 2,
  //   id_person_2: 3,
  //   messages: [],

  // },
  // {
  //   id: 124,
  //   id_person_1: 2,
  //   id_person_2: 4,
  //   messages: [],

  // },
  // {
  //   id: 125,
  //   id_person_1: 2,
  //   id_person_2: 5,
  //   messages: [],

  // },
  // {
  //   id: 134,
  //   id_person_1: 3,
  //   id_person_2: 4,
  //   messages: [],

  // },
  // {
  //   id: 135,
  //   id_person_1: 3,
  //   id_person_2: 5,
  //   messages: [],

  // },
  // {
  //   id: 145,
  //   id_person_1: 4,
  //   id_person_2: 5,
  //   messages: [],

  // },
];
