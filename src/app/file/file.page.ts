import { NotifyService } from './../util/service/notify.service';
import { Component, OnInit } from '@angular/core';
import { FileService } from '../util/service/file.service';
import { UserFile } from '../util/entity/file';

@Component({
  selector: 'app-file',
  templateUrl: './file.page.html',
  styleUrls: ['./file.page.scss'],
})
export class FilePage implements OnInit {

  files: UserFile[] = [];

  constructor(
    private fileService: FileService,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.fileService.getUserFiles().subscribe(data => {
      const files = data as UserFile[];
      files.forEach(file => {
        this.fileService.makeFileUrl(file);
      });
      this.files = files;
    });
  }

  downLoad(file: UserFile) {
    const link = document.createElement('a');
    link.download = file.name;
    link.href = this.fileService.makeFileUrl(file);
    link.click();

  }
  getFile(event) {
    this.fileService.upload(event.target.files).subscribe( result => {
      if (result) {
        this.notifyService.toast('上传成功');
      }
    });
  }

  delete(file: UserFile) {
    this.notifyService.confirm(`是否删除文件-${file.name}`, this, () => {
      this.fileService.delete(file).subscribe(result => {
        if (result) {
          this.files.splice(this.files.indexOf(file), 1);
          this.notifyService.toast('删除成功');
        }
      });
    });
  }
}
