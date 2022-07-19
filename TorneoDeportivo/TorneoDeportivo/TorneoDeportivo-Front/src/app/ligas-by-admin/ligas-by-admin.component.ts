import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueRestService } from '../services/leagueRest/league-rest.service';
import { leagueModel } from '../models/league.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ligas-by-admin',
  templateUrl: './ligas-by-admin.component.html',
  styleUrls: ['./ligas-by-admin.component.css']
})
export class LigasByAdminComponent implements OnInit {

  idUser: any;
  leagues:any = [];
  league: leagueModel;
  leagueUpdate: any;

  constructor(
    public actiavateRoute : ActivatedRoute,
    private leagueRest: LeagueRestService
  ) { 
    this.league = new leagueModel('','','');
  }

  ngOnInit(): void {
    this.actiavateRoute.paramMap.subscribe((idU:any)=>{
      this.idUser = idU.get('id');
    });
    this.getLeaguesByAdmin();
  }

  getLeaguesByAdmin(){
    this.leagueRest.getLeaguesByAdmin(this.idUser).subscribe({
      next:(res:any)=>{
        this.leagues = res.leagues;
        console.log(this.leagues);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

  addLeagueByAdmin(addLeagueForm: any){
    this.leagueRest.addLeagueByAdmin(this.idUser, this.league).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.league.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getLeaguesByAdmin()
        addLeagueForm.reset()
      },
      error: (err) => alert(err.error.message || err.error)
    })
  };

  deleteLeagueByAdmin(id: string){
    this.leagueRest.deleteLeagueByAdmin(id).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.deleteLeague.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getLeaguesByAdmin();
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

  getLeague(id: string){
    this.leagueRest.getLeague(id).subscribe({
      next:(res:any)=>{this.leagueUpdate = res.league},
      error:(err)=>{alert(err.error.message)}
   
    })
  };

  updateLeagueByAdmin(){
    this.leagueRest.updateLeagueByAdmin(this.leagueUpdate._id, this.idUser, this.leagueUpdate).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.updateLeague.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
      this.getLeaguesByAdmin()},
      error:(err)=> alert(err.error.message || err.error)
    })
  };



}
