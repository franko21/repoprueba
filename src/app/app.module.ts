import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { HeaderComponent } from './header/header.component';
import { VentasComponent } from './ventas/ventas.component';
import { ComprasComponent } from './compras/compras.component';
import { InventariosComponent } from './inventarios/inventarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AFormComponent } from './articulos/form.component';
import { ArticuloService } from './articulos/articulo.service';
import { CFormComponent } from './compras/form.component';
import { CompraService } from './compras/compra.service';
import { VFormComponent } from './ventas/form.component';
import { VentasService } from './ventas/ventas.service';



const routes:Routes=[
  {path:'', redirectTo:'',pathMatch:'full'},
  {path:'articulos',component:ArticulosComponent},
  {path:'articulos/form',component:AFormComponent},
  {path:'articulos/form/:idA',component:AFormComponent},
  {path:'compras',component:ComprasComponent},
  {path:'compras/form',component:CFormComponent},
  {path:'compras/form/:idA',component:CFormComponent},
  {path:'ventas',component:VentasComponent},
  {path:'ventas/form',component:VFormComponent},
  {path:'ventas/form/:idA',component:VFormComponent},
  {path:'inventario',component:InventariosComponent},

  
]
@NgModule({
  declarations: [
    AppComponent,
    AFormComponent,
    ArticulosComponent,
    HeaderComponent,
    VentasComponent,
    ComprasComponent,
    InventariosComponent,
    CFormComponent,
    VFormComponent,
    AFormComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ArticuloService,CompraService,VentasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
