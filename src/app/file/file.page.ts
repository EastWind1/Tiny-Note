import { NotifyService } from './../util/service/notify.service';
import { Component, OnInit } from '@angular/core';
import { FileService } from '../util/service/file.service';
import { UserFile } from '../util/entity/file';

@Component({
  selector: 'app-file',
  templateUrl: './file.page.html',
  styleUrls: ['./file.page.scss'],
})
/**
 * 文件列表界面
 */
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

  action(file: UserFile) {
    this.notifyService.action(`文件-${file.name}`,  [
      {
        text: '删除',
        role: 'destructive',
        handler: () => {
          this.fileService.delete(file).subscribe(result => {
            if (result) {
              this.files.splice(this.files.indexOf(file), 1); // 删除数组中的指定文件
              this.notifyService.toast('删除成功');
            }
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
