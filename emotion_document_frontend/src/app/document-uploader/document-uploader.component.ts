import { Component, EventEmitter, Output } from '@angular/core';
import { EmotionService } from '../services/emotion.service';

@Component({
  selector: 'app-document-uploader',
  templateUrl: './document-uploader.component.html',
  styleUrls: ['./document-uploader.component.css']
})
export class DocumentUploaderComponent {
  @Output() uploadComplete = new EventEmitter<any>();
  @Output() previewFile = new EventEmitter<File>();
  selectedFile: File | null = null;
  errorMsg: string = '';
  progress: number | null = null;
  isUploading = false;

  allowedTypes = ['application/pdf', 'text/plain'];

  constructor(private emotionService: EmotionService) {}

  // PUBLIC_INTERFACE
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.errorMsg = '';
    this.progress = null;
    if (!file) return;
    if (!this.allowedTypes.includes(file.type)) {
      this.errorMsg = 'Please upload a .txt file or a PDF document.';
      return;
    }
    this.selectedFile = file;
    this.previewFile.emit(file);
  }

  // PUBLIC_INTERFACE
  onUpload() {
    if (!this.selectedFile) return;
    this.isUploading = true;
    this.errorMsg = '';
    this.progress = 0;
    this.emotionService.uploadDocument(this.selectedFile).subscribe({
      next: (event: any) => {
        if (event.status === 'progress') {
          this.progress = event.percent;
        } else if (event.status === 'done') {
          this.uploadComplete.emit(event.body);
          this.isUploading = false;
        }
      },
      error: (err: any) => {
        this.errorMsg = typeof err === 'string' ? err : 'Upload failed!';
        this.isUploading = false;
        this.progress = null;
      }
    });
  }
}
