import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LigasComponent } from './ligas/ligas.component';
import { EquiposComponent } from './equipos/equipos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserRestService } from './services/userRest/user-rest.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LigasByAdminComponent } from './ligas-by-admin/ligas-by-admin.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { GraphComponent } from './graph/graph.component';
import { ChartsModule } from '@rinminase/ng-charts';
import { EventComponent } from './event/event.component';
import { SearchPipe } from './pipes/search.pipe';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LigasComponent,
    EquiposComponent,
    PerfilComponent,
    NotFoundComponent,
    RegisterComponent,
    NavbarComponent,
    LigasByAdminComponent,
    UserComponent,
    TableComponent,
    GraphComponent,
    EventComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    UserRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }