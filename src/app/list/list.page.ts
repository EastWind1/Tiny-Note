import { Component, OnInit } from '@angular/core';
import { Note } from '../util/entity/note';
import { NoteService } from '../util/service/note.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  notes: Note[] = [];
  constructor(
    private noteService: NoteService
  ) {
  }

  ngOnInit() {
    this.noteService.getUserNote().subscribe(
      result => {
        const temp = <Note[]>result;
        temp.forEach(note => {
          if (note.note_content) {
            note.note_icon = note.note_content.match(/(<img.*\/>)?/g)[0];
            note.note_content = note.note_content.replace(/(<img.*\/>)?/g, '').substring(0, 20);
          }
          this.notes.push(note);
        });
      }
    );
  }
}
