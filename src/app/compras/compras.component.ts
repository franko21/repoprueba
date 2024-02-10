import { Component, OnInit } from '@angular/core';
import { Compra } from './compra';
import { CompraService } from './compra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent implements OnInit{
  compras:Compra[]=[];
  constructor(private compraService:CompraService){}
  ngOnInit(): void {
    this.compraService.getCompras().subscribe(
      compras=>this.compras=compras
    )
  }

  public eliminarCompras(codigoCategoria: any): void {
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
        this.compraService.deleteComp(codigoCategoria).subscribe(
          () => {
            this.compras = this.compras.filter(c => c.nroCompra !== codigoCategoria);
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
