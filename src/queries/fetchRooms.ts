import { defaultApi } from '../app/api';

export const fetchRooms = async (userId: number, token: string) => {
  const { data } = await defaultApi.get('rooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id: userId,
    },
  });

  return data;
};
