import { Component, OnInit } from '@angular/core';
import { Note } from '../util/entity/note';
import { NoteService } from '../util/service/note.service';
import { FileService } from '../util/service/file.service';
import { UserFile } from '../util/entity/file';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  notes: Note[] = [];
  constructor(
    private noteService: NoteService,
    private fileService: FileService
  ) {
  }

  ngOnInit() {
    this.noteService.getUserNote().subscribe(
      result => {
        const temp = <Note[]>result;
        temp.forEach(note => {
          if (note.note_content) {
            note.note_content = this.fileService.addImageToken(note.note_content);
            if (/src="(.*)"/.test(note.note_content)) {
              note.note_icon = /src="(.*)"/.exec(note.note_content)[1];
            }
            note.note_content = note.note_content.replace(/(<img.*\/>)?/g, '').substring(0, 20);
          }
          this.notes.push(note);
        });
      }
    );
  }
}
