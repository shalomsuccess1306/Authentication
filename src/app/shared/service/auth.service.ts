import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  url ="http://localhost:5220/api/"

  createUser(formdata:any){
    return this.http.post(this.url + 'signup',formdata)
  }
  login(formdata:any){
    return this.http.post(this.url + 'log',formdata)
  }
}
