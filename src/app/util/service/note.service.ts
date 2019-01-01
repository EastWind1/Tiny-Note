import { catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Note } from '../entity/note';
import { Log } from '../decorator/log.decorator';
import { UserService } from './user.service';

@Injectable()
export class NoteService {

  private baseApi = environment.api + '/api/note';

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  @Log
  getShared() {
    return this.http.get<Note[]>(this.baseApi, {params: {'type': 'shared'}}).pipe(
      catchError(_ => of(false)
      )
    );
  }

  @Log
  getUserNote() {
    return this.http.get<Note[]>(this.baseApi, { params: {'type': 'user'}}).pipe(
      catchError(_ => of(false)
      )
    );
  }

  @Log
  add(note: Note) {
    return this.http.post(this.baseApi, note).pipe(
      catchError(_ => of(false)
      )
    );
  }

  @Log
  getById(id: number) {
    return this.http.get<Note>(this.baseApi + `/${id}`).pipe(
      catchError(_ => of(false)
      )
    );
  }
}
