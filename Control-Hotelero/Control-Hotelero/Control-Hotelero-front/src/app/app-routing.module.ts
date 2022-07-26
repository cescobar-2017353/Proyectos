import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { HomeComponent } from './components/home/home.component';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { HistorialComponent } from './components/historial/historial.component';
import { InfoHotelsComponent } from './components/info-hotels/info-hotels.component';
import { ReservationRoomComponent } from './components/reservation-room/reservation-room.component';
import { PorfilComponent } from './components/porfil/porfil.component';
import { ReservationDatesComponent } from './components/reservation-dates/reservation-dates.component';
import { HistorialAdminHotelComponent } from './components/historial-admin-hotel/historial-admin-hotel.component';
import { FacturaComponent } from './components/factura/factura.component';
import { UsersComponent } from './components/users/users.component';
import { ReservationServiceComponent } from './components/reservation-service/reservation-service.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { UserAppComponent } from './components/user-app/user-app.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'hoteles', component: HotelesComponent},
  {path: 'dataHotels/:idHotel', component:InfoHotelsComponent},
  {path: 'bienvenida', component: BienvenidaComponent},
  {path: 'historial', component: HistorialComponent},
  {path: 'historialAdmin/:id', component: HistorialAdminHotelComponent},
  {path: 'reservationRoom/:idHotel/:idReservation', component:ReservationRoomComponent},
  {path: 'reservationDates/:idReservation/:idRoom/:idHotel', component:ReservationDatesComponent},
  {path: 'reservationServices/:idReservation/:idHotel', component:ReservationServiceComponent},
  {path:'factura', component:FacturaComponent},
  {path: 'porfil/:id', component:PorfilComponent},
  {path: 'users', component: UsersComponent},
  {path: 'graphic', component:GraphicComponent},
  {path: 'userApp', component: UserAppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
