import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class UserPhotoService {

  private photoUrlSubject = new BehaviorSubject<string | null>(null);
  photoUrl$ = this.photoUrlSubject.asObservable();

  constructor(private http: HttpClient) {
    // Chama automaticamente ao instanciar o serviço
    this.loadInitialPhoto();
  }

  private loadInitialPhoto() {
    // Tenta carregar do localStorage primeiro
    const storedPhotoUrl = localStorage.getItem('photoUrl');
    if (storedPhotoUrl) {
      this.photoUrlSubject.next(storedPhotoUrl);
    } else {
      // Caso não exista no localStorage, busca no backend
      this.http.get<{ photoUrl: string }>('api/user/photo').subscribe({
        next: (res) => {
          this.photoUrlSubject.next(res.photoUrl);
          localStorage.setItem('photoUrl', res.photoUrl); // Salva no localStorage
        },
        error: () => this.photoUrlSubject.next(null),
      });
    }
  }

  setPhotoUrl(url: string) {
    this.photoUrlSubject.next(url);
    localStorage.setItem('photoUrl', url);
  }

  getPhotoUrl(): string | null {
    return this.photoUrlSubject.value;
  }

 clearPhotoUrl() {
  this.photoUrlSubject.next(null);
  localStorage.removeItem('photoUrl');
}

}
