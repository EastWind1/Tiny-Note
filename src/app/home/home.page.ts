import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Platform } from '@ionic/angular';
import { NotifyService } from '../util/service/notify.service';
import { Note } from '../util/entity/note';
import { NoteService } from '../util/service/note.service';
import { FileService } from '../util/service/file.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
/**
 * 主页
 */
export class HomePage implements OnInit {
  backButtonPressed = false;
  notes: Note[] = [];
  constructor(
    private appMinimize: AppMinimize,
    private platform: Platform,
    private notifyService: NotifyService,
    private route: ActivatedRoute,
    private noteService: NoteService,
    private fileService: FileService
  ) {
    this.platform.backButton.subscribe(() => { // 监听回退按钮
      if (this.backButtonPressed && route.snapshot.url[0].path === 'home') {
        this.appMinimize.minimize();
        this.backButtonPressed = false;
      } else {
        this.notifyService.toast('再按一次退出程序');
        this.backButtonPressed = true;
        setTimeout(() => this.backButtonPressed = false, 2000);
      }
    });
  }

  ngOnInit() {
    this.noteService.getShared().subscribe(
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
