import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserPhotoService {
  private photoUrl: string | null = null;

  setPhotoUrl(url: string) {
    this.photoUrl = url;
  }

  getPhotoUrl(): string | null {
    return this.photoUrl;
  }

  clearPhotoUrl() {
    this.photoUrl = null;
  }
}
