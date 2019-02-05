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

  action(note: Note) {
    this.notifyService.action(`笔记-${note.note_date}`,  [
      {
        text: '分享',
        handler: () => {
          this.noteService.shared(note.note_id).subscribe( () => {
            this.notifyService.toast('分享成功');
          });
        }
      },
      {
        text: '删除',
        role: 'destructive',
        handler: () => {
          this.noteService.delete(note.note_id).subscribe(() => {
              this.notes.splice(this.notes.indexOf(note), 1); // 删除数组中的指定文件
              this.notifyService.toast('删除成功');
          });
        }
      },
      {
        text: '取消',
        role: 'cancel'
      }
    ]);
  }
}
