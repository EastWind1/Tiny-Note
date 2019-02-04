import { NotifyService } from './../util/service/notify.service';
import { Component, OnInit } from '@angular/core';
import { Note } from '../util/entity/note';
import { NoteService } from '../util/service/note.service';
import { FileService } from '../util/service/file.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  notes: Note[] = [];
  constructor(
    private noteService: NoteService,
    private fileService: FileService,
    private notifyService: NotifyService
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

  delete(note: Note) {
    this.notifyService.confirm(`是否删除笔记-${note.note_id}`, this, () => {
      this.noteService.delete(note.note_id).subscribe(result => {
        this.notes.splice(this.notes.indexOf(note), 1);
        this.notifyService.toast('删除成功');
      });
    });
  }
}
