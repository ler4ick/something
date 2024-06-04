export interface Message {
  id?: number;
  id_sender: number;
  id_room: number;
  timestamp: string;
  content: string;
  isSentByLoggedInUser?: boolean;
}
