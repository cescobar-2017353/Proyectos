import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserRestService } from '../userRest/user-rest.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TeamRestService {
  httOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  }) 

  constructor(
    private  http: HttpClient, 
    private userRest: UserRestService
  ) { }

  getTeams(idLeague: string){
    return this.http.get(environment.baseUrl + 'team/getTeams/' + idLeague, {headers:this.httOptions});
  };
  
  saveTeam(idLeague:string, params: {}){
    return this.http.post(environment.baseUrl + 'team/addTeam/' +idLeague ,params, {headers:this.httOptions});
  };

  deleteTeam(idTeam: string){
   return this.http.delete(environment.baseUrl + 'team/deleteTeam/' + idTeam, {headers:this.httOptions});
  };

  getTeam(idTeam: string){
   return this.http.get(environment.baseUrl + 'team/getTeam/' + idTeam, {headers:this.httOptions});
 };

  updateTeam(idLeague:string, idTeam:string, params:{}){
   return this.http.put(environment.baseUrl + 'team/updateTeam/' + idLeague + '/' + idTeam, params, {headers:this.httOptions});
  };

  addGame(idLeague: string, params:{}){
    return this.http.post(environment.baseUrl + 'game/addGame/' + idLeague , params, {headers:this.httOptions});

  };

  getTeamOrder(idLeague: string){
    return this.http.get(environment.baseUrl + 'team/getTeamOrder/' + idLeague, {headers:this.httOptions});
  };


}
