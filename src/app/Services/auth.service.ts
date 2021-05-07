import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
x:any=5
  baseURL="https://routeegypt.herokuapp.com/"
  constructor(private _HttpClient:HttpClient) { }


  signUp(data): Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'signup',data)
  }
  signIn(data):Observable<any>
  {

  return  this._HttpClient.post(this.baseURL+'signin',data)
  }
  signOut(data):Observable<any>
  {

   return this._HttpClient.post(this.baseURL+'signOut',data)
  }

isLoggedIn()
{
  return !!localStorage.getItem('TOKEN')
  
}
}
