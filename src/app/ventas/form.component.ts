import { Component, OnInit } from '@angular/core';
import { Ventas } from './ventas';
import { VentasService } from './ventas.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class VFormComponent implements OnInit{
  public venta:Ventas=new Ventas();

  constructor(private ventaService:VentasService,private router:Router,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    
  }
  public createVent():void{
    this.ventaService.createVent(this.venta).subscribe(
      venta=>{
        this.router.navigate(['/ventas'])
        Swal.fire('Venta guardada',`Venta ${venta.nroVenta} guardada con exito`,'success')
      }
    )
  }
}
