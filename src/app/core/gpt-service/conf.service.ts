import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfService {
  url: string = '';
  constructor() {
    this.url = environment.url;
  }

  getUrl(): string {
    return this.url;
  }
}
