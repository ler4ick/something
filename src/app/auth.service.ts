import { Injectable } from '@angular/core';
import { defaultApi } from './api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = '';


  constructor() {}

  getAuthToken(){
    return this.token;
  }

  async login(id: number): Promise <boolean> {
    try {
      const user = await defaultApi.post('users/authenticate', {
        id
      })

      this.token = user.data.token;
      return true
    }
    catch(e) {
      console.log(e);
      return false
    }
  }
}
