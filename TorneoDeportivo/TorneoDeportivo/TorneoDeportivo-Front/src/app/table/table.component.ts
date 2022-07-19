import { Component, OnInit } from '@angular/core';
import { TeamRestService } from '../services/teamRest/team-rest.service';
import { ActivatedRoute } from '@angular/router';
import { teamModel } from '../models/team.model';
import { LeagueRestService } from '../services/leagueRest/league-rest.service';




@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  idLeague: any;
  teams : any =[];
  team: teamModel;
  no : number =0;

  league: any;
  
 

  constructor(
    public activateRoute : ActivatedRoute,
    private teamRest : TeamRestService,
    private leagueRest :  LeagueRestService
  ) { 
    this.team = new teamModel('', '',0,0,0,0,0,'','');
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idL:any)=>{
      this.idLeague = idL.get('id');
    });

    this.getTeamOrder();
    this.getLeague();
    
  }

  getTeamOrder(){
    this.teamRest.getTeamOrder(this.idLeague).subscribe({
      next:(res:any)=>{
        this.teams = res.teamsOrder;
        this.no++
        console.log(this.teams);
        
      },
      error: (err) => console.log(err.error.message || err.error)
    })

  };

  getLeague(){
    this.leagueRest.getLeague(this.idLeague).subscribe({
      next:(res:any)=>{this.league= res.league},
      error:(err)=>{alert(err.error.message)}
   
    })
  };



}
