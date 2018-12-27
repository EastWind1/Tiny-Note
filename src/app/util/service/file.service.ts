import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class FileService {

  constructor(
    private http: HttpClient
  ) { }

  upload(files: File[]) {
    if (files.length > 0) {
      const file: File = files[0];
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      return this.http.post('/api/file', formData).pipe(
        switchMap(result => of(result)),
        // catchError(() => of(false))
      );
    }
  }

  download(fullfilename: string) {
    return this.http.get('/api/file', { params: { 'filedir': fullfilename }, responseType: 'blob' }).pipe(
      switchMap(result => {
        const url = URL.createObjectURL(result);
        return of(url);
      }),
      catchError(() => of(false))
    );
  }
}
