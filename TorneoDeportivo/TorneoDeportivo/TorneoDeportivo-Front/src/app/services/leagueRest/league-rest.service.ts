import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { distinct } from 'rxjs';
import { UserRestService } from '../userRest/user-rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeagueRestService {
  httOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  }) 
  constructor(
    private  http: HttpClient, 
    private userRest: UserRestService) {
    
   }
   getLeagues(){
     return this.http.get(environment.baseUrl + 'league/getLeagues', {headers:this.httOptions});
   };

   saveLeague(params: {}){
     return this.http.post(environment.baseUrl + 'league/addLeague' ,params, {headers:this.httOptions});
   };

   deleteLeague(id: string){
    return this.http.delete(environment.baseUrl + 'league/deleteLeague/' + id, {headers:this.httOptions});
   };

   getLeague(id: string){
    return this.http.get(environment.baseUrl + 'league/getLeague/' + id, {headers:this.httOptions});
  };

   updateLeague(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'league/updateLeague/' + id, params, {headers:this.httOptions});
   };

   

   getLeaguesByAdmin(id: string){
    return this.http.get(environment.baseUrl + 'league/getLeaguesByAdmin/' + id, {headers:this.httOptions});

   };

   addLeagueByAdmin(idUser:string, params:{}){
    return this.http.post(environment.baseUrl + 'league/addLeagueByAdmin/' + idUser, params, {headers:this.httOptions});
   }

   
   deleteLeagueByAdmin(idLeague: string){
    return this.http.delete(environment.baseUrl + 'league/deleteLeagueByAdmin/' + idLeague, {headers:this.httOptions});

   };

   updateLeagueByAdmin(idLeague: string, idUser:string, params:{}){
    return this.http.put(environment.baseUrl + 'league/updateLeagueByAdmin/' + idLeague +'/'+ idUser, params, {headers:this.httOptions});
   };


}
  


