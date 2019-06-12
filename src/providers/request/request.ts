import { Http, RequestMethod, Request, Headers, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable()
export class RequestProvider {

  private baseurl = 'https://meat-db.herokuapp.com';

  constructor(private http : Http) {
  }

  public request(method : RequestMethod, endpoint : string, data? : Object, params? : Object) : Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this.http.request(new Request({
        method : method,
        url : this.baseurl + endpoint,
        body : data,
        params : params
      }), data).subscribe(resolve, error => this.onError(error, reject));
    });
  }

  public onError(error : any, reject : (raison? : any) => void) : void {
    reject(error || new Error('Server error'))
  }

  //AUTH

  public login(data?: Object, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Post, '/auth/login', data, params);
  }

  public register(data?: Object, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Post, '/auth/register', data, params);
  }

  public checkToken(data?: Object, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Post, '/auth/token', data, params);
  }

  //INVITE

  public getInvite(params?: Object) : Promise<Response>{
    return this.request(RequestMethod.Get, '/invite', null, params);
  }

  public postInvite(data?: Object, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Post, '/invite', data, params);
  }

  public deleteInvite(data?: Object, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Post, '/invite/delete', data, params);
  }

  public acceptInvite(data?: Object, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Post, '/invite/accept', data, params);
  }
  
  public denyInvite(data?: Object, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Post, '/invite/deny', data, params);
  }
  
  public getInviteEntries(data?: Object, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Post, '/invite/entries', data, params);
  }
  //FRIENDS

  public getUserFriends(data?: Object, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Post, '/friends' , data, params);
  }

  public deleteFriend(data?: Object, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Post, '/friends/delete', data, params);
  }

  public postFriendRequest(data?: Object, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Post, '/friends/request' , data, params);
  }

  public acceptFriendRequest(data?: Object, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Post, '/friends/request/accept', data, params);
  }

  public deleteFriendRequest(data?: Object, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Post, '/friends/request/deny', data, params);
  }

  //USER DATA

  public getUsersByName(username?:string, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Get, '/user/name/' + username, null, params);
  }
  
  public getUsersById(id?: string, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Get, `/user/id/${id}`, null, params);
  }
  
  public getCurrentUser(params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Get, '/me', null, params);
  }

  public getUserAvatar(id?:string, params?: Object) : Promise<Response> {
    return this.request(RequestMethod.Get, `/user/avatar/${id}`, null, params);
  }
  
  //METHOD

  public setSession(jwtoken : any) : void {
    const expiresAt = moment().add(jwtoken.expiresIn, 'second');

    localStorage.setItem('id_token', jwtoken.jwtoken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

}
