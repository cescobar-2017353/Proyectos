import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamRestService } from '../services/teamRest/team-rest.service';
import { teamModel } from '../models/team.model';
import Swal from 'sweetalert2';
import { LeagueRestService } from '../services/leagueRest/league-rest.service';
import { Chart } from "chart.js";


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  idLeague: any;
  teams : any =[];
  team: teamModel;
  league: any;

  chartOptions1 = {
    responsive: true,
    scales: {
        yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
                }
            }]
    }
  };
  chartLabels1: any = [];
  chartLegend1 = true;
  chartPlugins1 = [];

  chartData1: any = [{
     data: [

     ], 
     label: 'TEAMS POINTS' 
    }];

    chartColors: any = [
      {
        backgroundColor: [],
      },
  ];

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
      next: (res: any) => {
        this.teams = res.teamsOrder;
        this.teams.forEach((team: any) => {
            this.chartLabels1.push(team.name);
            this.chartData1[0].data.push(team.teamPoints);
            this.chartColors[0].backgroundColor.push(
              `#${Math.floor(Math.random() * 16777215).toString(16)}`
            );
        });
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }

  getLeague(){
    this.leagueRest.getLeague(this.idLeague).subscribe({
      next:(res:any)=>{this.league= res.league},
      error:(err)=>{alert(err.error.message)}
   
    })
  };
}
