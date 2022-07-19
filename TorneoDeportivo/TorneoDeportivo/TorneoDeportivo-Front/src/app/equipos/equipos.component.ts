import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamRestService } from '../services/teamRest/team-rest.service';
import { teamModel } from '../models/team.model';
import { gameModel } from '../models/game.model';
import Swal from 'sweetalert2';
import { LeagueRestService } from '../services/leagueRest/league-rest.service';


@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  idLeague: any;
  teams : any =[];
  team: teamModel;
  teamUpdate: any = [];
  league: any;

  game: gameModel;


  constructor(
    public activateRoute : ActivatedRoute,
    private teamRest : TeamRestService,
    private leagueRest :  LeagueRestService
    
  ) {
    this.team = new teamModel('', '',0,0,0,0,0,'','');
    this.game = new gameModel('','','',0,0,'','');
   }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idL:any)=>{
      this.idLeague = idL.get('id');
    });
    this.getTeams();
    this.getLeague();
  }
  
  getLeague(){
    this.leagueRest.getLeague(this.idLeague).subscribe({
      next:(res:any)=>{this.league = res.league},
      error:(err)=>{alert(err.error.message)}
   
    })
  };

  getTeams(){
    this.teamRest.getTeams(this.idLeague).subscribe({
      next:(res:any)=>{
        this.teams = res.teams;
        console.log(this.teams);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

  saveTeam(addTeamForm: any){
    this.teamRest.saveTeam(this.idLeague, this.team).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.team.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getTeams()
        addTeamForm.reset()
      },
      error: (err) => alert(err.error.message || err.error)
    })
  };

  deleteTeam(id: string){
    this.teamRest.deleteTeam(id).subscribe({
      next:(res:any)=>{
        
        Swal.fire({
          title: res.message + '  ' + res.deleteTeam.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getTeams();
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

  getTeam(id: string){
    this.teamRest.getTeam(id).subscribe({
      next:(res:any)=>{this.teamUpdate = res.team},
      error:(err)=>{alert(err.error.message)}
    })
  };

  updateTeam(){
    this.teamRest.updateTeam(this.idLeague, this.teamUpdate._id, this.teamUpdate).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.teamUpdate.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getTeams()},
      error:(err)=> alert(err.error.message || err.error)
    })
  };

  addGame(addGameForm:any){
    this.teamRest.addGame(this.idLeague, this.game).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        addGameForm.reset();
        this.getTeams();
      
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })

    })
  };

}
