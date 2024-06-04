export interface Person {
  id: number;
  name: string;
  lastname: string;
  organization: string;
  photo: string;
}

export const persons = [
  {
    id: 1,
    name: 'John',
    lastname: 'Doe',
    photo: 'https://example.com/john-doe.jpg',
    organization: 'Acme Inc.',
  },
  {
    id: 2,
    name: 'Jane',
    lastname: 'Smith',
    photo: 'https://example.com/jane-smith.jpg',
    organization: 'Globex Corporation',
  },
  {
    id: 3,
    name: 'Bob',
    lastname: 'Johnson',
    photo: 'https://example.com/bob-johnson.jpg',
    organization: 'Stark Industries',
  },
  {
    id: 4,
    name: 'Alice',
    lastname: 'Williams',
    photo: 'https://example.com/alice-williams.jpg',
    organization: 'Wayne Enterprises',
  },
  {
    id: 5,
    name: 'Tom',
    lastname: 'Davis',
    photo: 'https://example.com/tom-davis.jpg',
    organization: 'Oscorp',
  },
];
