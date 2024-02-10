import { Component, OnInit } from '@angular/core';
import { Articulos } from '../articulos/articulos';
import { ArticuloService } from '../articulos/articulo.service';
import { CompraService } from '../compras/compra.service';
import { VentasService } from '../ventas/ventas.service';
import { Compra } from '../compras/compra';
import { Ventas } from '../ventas/ventas';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrl: './inventarios.component.css'
})
export class InventariosComponent implements OnInit{
  articulos:Articulos[]=[];
  compras:Compra[]=[];
  ventas:Ventas[]=[];
  constructor(private articuloService:ArticuloService,private compraService:CompraService,private ventaService:VentasService){}
  ngOnInit(): void {
    this.articuloService.getArticulos().subscribe(
      articulos=>this.articulos=articulos
    )
    this.compraService.getCompras().subscribe(
      compras=>this.compras=compras
    )
    this.ventaService.getVentas().subscribe(
      ventas=>this.ventas=ventas
    )
  }
  public comprasT(id:any):any{
    
    return this.compras.filter((obj)=>{return obj.id_articulo.toString().indexOf(id.toString())>-1})
  }

  public ventasT(id:any):any{
    
    return this.ventas.filter((obj)=>{return obj.id_articulo.toString().indexOf(id.toString())>-1})
  }
  public stockT(id:any):number{

    let lc=this.comprasT(id).length;
    let lv=this.ventasT(id).length;
    let nc=0;
    let nv=0;
    for(let i=0;i<lc;i++){
      nc+=this.comprasT(id).at(i)?.cantidadComprada;
    }
    for(let i=0;i<lv;i++){
      nv+=this.ventasT(id).at(i).cantidadVendida;
    }
    return nc-nv
  }
}
