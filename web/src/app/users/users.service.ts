import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface User {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  users() {
    return this.http.get<User[]>('http://localhost:8080/api/users').toPromise();
  }

  add(name: string, email: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post('http://localhost:8080/api/users', {
      email,
      name,
    }, httpOptions).toPromise();
  }
}
