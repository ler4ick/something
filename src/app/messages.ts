export interface Message {
  id?: number;
  id_creator: number;
  id_room: number;
  timestamp: string;
  content: string;
}
