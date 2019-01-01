import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FileService } from '../util/service/file.service';
import { NoteService } from '../util/service/note.service';
import { Note } from '../util/entity/note';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  editor: Element;
  editable = true;

  constructor(
    private fileService: FileService,
    private noteService: NoteService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editable = false;
      this.load(id);
    }
  }

  getFile(event) {
    this.editor = document.getElementsByName('editor')[0];
    this.fileService.upload(event.target.files).subscribe( result => {
      if (result) {
        this.editor.innerHTML += `<img src="${environment.api}/userfiles${result}"/>>`;
      }
    });
  }

  add() {
    this.editor = document.getElementsByName('editor')[0];
    const note = new Note();
    note.note_content = this.editor.innerHTML;
    this.noteService.add(note).subscribe();
  }

  load(id: number) {
    this.noteService.getById(id).subscribe(
      result => {
        this.editor = document.getElementsByName('editor')[0];
        this.editor.innerHTML = (<Note>result).note_content;
      }
    );
  }
}
