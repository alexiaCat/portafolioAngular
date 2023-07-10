import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: infoProducto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://portafolio-bbe21-default-rtdb.asia-southeast1.firebasedatabase.app/productos_idx.json')
      .subscribe((res: any) => {
        this.productos = res;

        this.cargando = false;

      });
  }
}
