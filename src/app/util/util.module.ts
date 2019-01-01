import { NoteService } from './service/note.service';
import { FileService } from './service/file.service';
import { NotifyService } from './service/notify.service';
import { LoginGuard } from './guard/login.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HtmlPipe } from './pipe/html.pipe';
import { httpInterceptorProviders } from './interceptor';

@NgModule({
  declarations: [HtmlPipe],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    NotifyService,
    LoginGuard,
    FileService,
    NoteService,
    httpInterceptorProviders
  ]
})
export class UtilModule { }
