import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EquiposComponent } from "./equipos/equipos.component";
import { HomeComponent } from "./home/home.component";
import { LigasByAdminComponent } from "./ligas-by-admin/ligas-by-admin.component";
import { LigasComponent } from "./ligas/ligas.component";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { RegisterComponent } from "./register/register.component";
import { UserComponent } from "./user/user.component";
import { UserGuard } from "./guards/user.guard";
import { TableComponent } from "./table/table.component";
import { GraphComponent } from "./graph/graph.component";
import { EventComponent } from "./event/event.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent}, 
  {path: 'login', component: LoginComponent}, 
  {path: 'register', component: RegisterComponent},
  {path: 'ligas', component: LigasComponent},
  {path: 'ligasUser/:id', component:LigasByAdminComponent},
  {path: 'perfil/:id', component: PerfilComponent},
  {path: 'equipos/:id', component: EquiposComponent},
  {path: 'user', canActivate:[UserGuard],component:UserComponent},
  {path: 'table/:id', component:TableComponent},
  {path: 'event/:id', component: EventComponent},
  {path: 'graph/:id', component:GraphComponent},

  {path:'**', component: NotFoundComponent} //RUTA DE EXCEPCIÓN | 404
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }