import { Component } from '@angular/core';
import { Compra } from './compra';
import { CompraService } from './compra.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class CFormComponent {
  public compra:Compra=new Compra();

  constructor(private compraService:CompraService,private router:Router,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    
  }
  public createComp():void{
    this.compraService.createComp(this.compra).subscribe(
      compra=>{
        this.router.navigate(['/compras'])
        Swal.fire('Compra guardada',`Compra ${compra.nroCompra} guardada con exito`,'success')
      }
    )
  }
}
