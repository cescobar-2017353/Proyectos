import { Component, OnInit } from '@angular/core';
import { LeagueRestService } from '../services/leagueRest/league-rest.service';
import { leagueModel } from '../models/league.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.component.html',
  styleUrls: ['./ligas.component.css']
})
export class LigasComponent implements OnInit {
  leagues:any;
  league: leagueModel;
  leagueUpdate: any;




  constructor(
    private leagueRest :  LeagueRestService
  ) {
    this.league = new leagueModel('','','');
   }

  ngOnInit(): void {
    this.getLeagues();
  }

  getLeagues(){
    this.leagueRest.getLeagues().subscribe({
      next:(res:any)=>{
        this.leagues = res.leagues;
        console.log(this.leagues);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };
  
  saveLeague(addLeagueForm:any){
    this.leagueRest.saveLeague(this.league).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.league.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getLeagues()
        addLeagueForm.reset()
      },
      error: (err) => alert(err.error.message || err.error)

    })
  };

  deleteLeague(id: string){
    this.leagueRest.deleteLeague(id).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.deleteLeague.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getLeagues();
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

  updateLeague( ){
    this.leagueRest.updateLeague(this.leagueUpdate._id, this.leagueUpdate).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.leagueUpdate.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getLeagues()},
      error:(err)=> alert(err.error.message || err.error)
    })
  };

}




