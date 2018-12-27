import { Component, OnInit } from '@angular/core';
import { FileService } from '../util/service/file.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  constructor(
    private fileService: FileService
  ) {
  }

  ngOnInit() {
  }

  getFile(event) {
    this.fileService.upload(event.target.files).subscribe( result => {
      if (result) {
          document.getElementsByName('editor')[0].innerHTML += `<img src="/static${result}">`;
      }
    });
  }
}
