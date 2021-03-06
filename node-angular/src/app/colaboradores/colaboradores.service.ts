import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Colaboradores = {
  id: number;
  nome: string;
  idade: number | null;
};
@Injectable({
  providedIn: 'root',
})
export class ColaboradoresService {
  public colaboradores: Colaboradores[] = [];
  constructor(private readonly httpClient: HttpClient) {
    this.loadColaboradores();
  }

  async loadColaboradores() {
    const urlApi = 'http://localhost:3000/colaboradores/';
    this.colaboradores = await this.httpClient
      .get<Colaboradores[]>(urlApi)
      .toPromise();
  }
}
