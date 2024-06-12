import { defaultApi } from '../app/api';
import { Room } from '../app/rooms';

export const fetchRooms = async (
  userId: number,
  token: string
): Promise<Room[]> => {
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
