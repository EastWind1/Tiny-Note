import { UserService } from './user.service';
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
    private http: HttpClient,
    private userService: UserService
  ) { }

  @Log
  upload(files: File[]) {
    if (files.length > 0) {
      const file: File = files[0];
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      return this.http.post(this.baseApi, formData).pipe(
        switchMap(result => of(result)),
        catchError(() => of(false))
      );
    }
  }
  @Log
  get(url: string) {
    return this.http.get(url, { responseType: 'blob'}).pipe(
      switchMap(blob => {
        const bloburl = URL.createObjectURL(blob);
        return of(bloburl);
      })
    );
  }

  addImageToken(content: string) {
    const urlToken = this.userService.token.replace(/\s/, '%20');
    return content.replace(/<img src="(.*?)"\/>/g,  `<img src="$1?Authorization=${urlToken}"/>`);
  }
}
