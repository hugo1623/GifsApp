import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  private apiKey: string= 'ESPNNn9nAdQMqpGrk131kdxMw8HI7WFo';
  private _historial: string[] = [];
  // Todo: Cambia any por un tipo
  public resultados: Gif[]= [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient){}

  buscarGifs(query: string) {

    query = query.trim().toLocaleUpperCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?apikey=ESPNNn9nAdQMqpGrk131kdxMw8HI7WFo&q=${query}&limit=10`)
      .subscribe((resp ) =>{
        console.log(resp.data);
        this.resultados = resp.data;
      });
  }
}
