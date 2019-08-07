import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  constructor(private msg: NzMessageService) {}

  isModalVisible = false;
  uploading = false;
  fileList: UploadFile[] = [];
  @Output() uploadedFileList: EventEmitter<any>  = new EventEmitter();
  @Input() set uploadResult(status) {
    if (status === 'success') {
      this.uploading = false;
      this.fileList = [];
      this.msg.success('upload successfully.');
      setTimeout(() => {
        this.isModalVisible = false;
      }, 1000);
    } else if (status === 'failed') {
      this.uploading = false;
      this.msg.error('upload failed.');
    }
  }


  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploading = true;
    this.uploadedFileList.emit(this.fileList);
    // You can use any AJAX library you like
    // const req = new HttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts/', formData, {
    //   // reportProgress: true
    // });
    // this.http
    //   .request(req)
    //   .pipe(filter(e => e instanceof HttpResponse))
    //   .subscribe(
    //     () => {
    //       this.uploading = false;
    //       this.fileList = [];
    //       this.msg.success('upload successfully.');
    //     },
    //     () => {
    //       this.uploading = false;
    //       this.msg.error('upload failed.');
    //     }
    //   );
  }

  closeModal() {
    this.isModalVisible = false;
    this.uploadedFileList.emit(null);
  }

  ngOnInit() {
  }

}
