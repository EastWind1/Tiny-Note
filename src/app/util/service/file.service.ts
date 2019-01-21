import { UserService } from './user.service';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { Log } from '../decorator/log.decorator';
import { UserFile } from '../entity/file';

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
  getUserFiles() {
    return this.http.get<UserFile[]>(this.baseApi).pipe(
      catchError(_ => of([]))
    );
  }

  addImageToken(content: string) {
    const urlToken = this.userService.token.replace(/\s/, '%20');
    return content.replace(/<img src="(.*?)">/g,  `<img src="$1?Authorization=${urlToken}">`);
  }

  removeImageToken(content: string) {
    return content.replace(/<img src="(.*?)(\?Authorization=.*?)"/g,  `<img src="$1"`);
  }

  makeFileUrl(file: UserFile) {
    const urlToken = this.userService.token.replace(/\s/, '%20');
    return `${environment.api}/userfiles${file.path}?Authorization=${urlToken}`;
  }

  @Log
  delete(file: UserFile) {
    return this.http.delete(`${this.baseApi}/${file.id}`);
  }
}
