import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: infoProducto[] = [];
  productosFiltrado: infoProducto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(): Promise<void> {
    return new Promise<void>((res, rej) => {
      this.http.get('https://portafolio-bbe21-default-rtdb.asia-southeast1.firebasedatabase.app/productos_idx.json')
        .subscribe((response: any) => {
          this.productos = response;
          this.cargando = false;
          res();
        }, error => {
          rej(error);
        });
    });
  }



  getProducto(id: string) {
    return this.http.get(`https://portafolio-bbe21-default-rtdb.asia-southeast1.firebasedatabase.app/productos/${id}.json`)
  }


  buscarProducto(termino: string) {

    if (this.productos.length === 0) {
      this.cargarProductos().then(() => {
        this.filtarProductos(termino);
      });

    } else {
      this.filtarProductos(termino);

    }
  }


  private filtarProductos(termino: string) {
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod => {
      if (prod.titulo) {
        const tituloLower = prod.titulo.toLocaleLowerCase();
        if (prod.categoria && prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
          this.productosFiltrado.push(prod);
        }
      }
    });
  }



}
