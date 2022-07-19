import { Component, OnInit } from '@angular/core';
import { eventModel } from 'src/app/models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventRestService} from 'src/app/services/eventRest/event-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: any;
  event: eventModel;
  role: any;
  id : any;

  search: any;
  constructor(
    public activateRoute : ActivatedRoute,
    public userRest: UserRestService,
    public eventRest: EventRestService,
  ) {
    this.event = new eventModel('','','',new Date(),new Date(),'',[],0,'');
   }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idHo:any)=>{
      this.id =idHo.get('id');
    });
    
    this.getEvents()
  }
  getEvents(){
    this.eventRest.getEvents(this.id).subscribe({
      next:(res:any)=>{
        this.events= res.events
      },
      error:(err)=>{
        console.log(err.error.message || err.error)
      }
    })
  };

  createEvent(addEventForm:any){
    this.eventRest.createEvent(this.event).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getEvents()
        addEventForm.reset()
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
