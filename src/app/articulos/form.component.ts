import { Component, OnInit } from '@angular/core';
import { Articulos } from './articulos';
import { ArticuloService } from './articulo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class AFormComponent implements OnInit{
  public articulo:Articulos=new Articulos();
   categoriass:String[]=["Llantas Radiales",", Llantas radiales economizadoras de combustible","Llantas de alto desempeño "," Llantas para nieve"]

  constructor(private articuloService:ArticuloService,private router:Router,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    
  }
  onSelectP(id:any):void{
    this.articulo.categoria=id;
  }
  public createArt():void{
    this.articuloService.createArt(this.articulo).subscribe(
      articulo=>{
        this.router.navigate(['/articulos'])
        Swal.fire('Articulo guardado',`Articulo ${articulo.codigo_llanta} guardada con exito`,'success')
      }
    )
  }
}
