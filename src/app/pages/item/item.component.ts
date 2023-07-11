import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { dataProducto } from '../../interfaces/info-prod.interface'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {


  producto!: dataProducto;
  id!: String;


  constructor(private route: ActivatedRoute, public productoService: ProductosService) {
    this.route.params.subscribe(parametros => {
      this.productoService.getProducto(parametros['id'])
        .subscribe(( producto: dataProducto) =>{
          this.producto = producto;
          this.id = parametros['id'];
        });
    });
  }
}
