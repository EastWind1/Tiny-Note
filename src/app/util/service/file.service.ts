import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, catchError } from 'rxjs/operators';
import { Log } from '../decorator/log.decorator';

@Injectable()
export class FileService {

  private baseApi = environment.api + '/api/file';

  constructor(
    private http: HttpClient
  ) { }

  @Log
  upload(files: File[]) {
    if (files.length > 0) {
      const file: File = files[0];
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      return this.http.post(this.baseApi, formData, {withCredentials: true}).pipe(
        switchMap(result => of(result)),
        catchError(() => of(false))
      );
    }
  }

  @Log
  download(fullfilename: string) {
    return this.http.get(this.baseApi, {withCredentials: true, params: { 'filedir': fullfilename }, responseType: 'blob' }).pipe(
      switchMap(result => {
        const url = URL.createObjectURL(result);
        return of(url);
      }),
      catchError(() => of(false))
    );
  }
}
