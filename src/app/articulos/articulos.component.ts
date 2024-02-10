import { Component, OnInit } from '@angular/core';
import { Articulos } from './articulos';
import { ArticuloService } from './articulo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.css'
})
export class ArticulosComponent implements OnInit{
  articulos:Articulos[]=[];
  constructor(private articuloService:ArticuloService){}
  ngOnInit(): void {
    this.articuloService.getArticulos().subscribe(
      articulos=>this.articulos=articulos
    )
  }
  /*public stock(id:number):string{
    
    return this.categorias.filter((obj)=>{return obj.codigoCategoria.toString().indexOf(id.toString())>-1}).at(0).nombre
  }*/
  public eliminarArticulo(codigoCategoria: any): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: 'No se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.articuloService.deleteArt(codigoCategoria).subscribe(
          () => {
            this.articulos = this.articulos.filter(c => c.id_articulo !== codigoCategoria);
            swalWithBootstrapButtons.fire({
              title: 'BORRADO!',
              text: 'El archivo ah sido borrado.',
              icon: 'success'
            });
          },
          error => {
            console.error('Error al eliminar la categoria', error);
            swalWithBootstrapButtons.fire({
              title: 'Error',
              text: 'Ah habido un error al eliminar la categoria.',
              icon: 'error'
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: 'Cancelado',
          text: 'Has cancelado el borrado del archivo :)',
          icon: 'error'
        });
      }
    });
  }
}
