import { FileService } from './service/file.service';
import { NotifyService } from './service/notify.service';
import { LoginGuard } from './guard/login.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    NotifyService,
    LoginGuard,
    FileService
  ]
})
export class UtilModule { }
