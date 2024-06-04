import { Injectable } from '@angular/core';
import { defaultApi } from './api';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';
  private userId: number | null = null;

  constructor() {}

  getAuthToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  async login(id: number): Promise<boolean> {
    try {
      const user = await defaultApi.post('users/authenticate', {
        id,
      });

      this.token = user.data.token;
      this.userId = user.data.id;
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
