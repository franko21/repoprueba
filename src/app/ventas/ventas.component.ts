import { Component } from '@angular/core';
import { Ventas } from './ventas';
import { VentasService } from './ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {
  ventas:Ventas[]=[];
  constructor(private ventaService:VentasService){}
  ngOnInit(): void {
    this.ventaService.getVentas().subscribe(
      ventas=>this.ventas=ventas
    )
  }

  public eliminarVentas(codigoCategoria: any): void {
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
        this.ventaService.deleteVent(codigoCategoria).subscribe(
          () => {
            this.ventas = this.ventas.filter(c => c.nroVenta !== codigoCategoria);
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
