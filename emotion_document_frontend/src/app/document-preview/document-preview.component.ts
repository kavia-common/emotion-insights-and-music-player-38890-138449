import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DocumentPreviewComponent implements OnChanges {
  @Input() file: File | null = null;
  docText: string | null = null;
  isPdf: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['file'] && this.file) {
      this.isPdf = this.file.type === 'application/pdf';
      if (!this.isPdf) {
        this.readTextFile(this.file);
      } else {
        this.getPdfName(this.file);
      }
    }
  }

  private readTextFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.docText = (reader.result as string).slice(0, 1024);
    };
    reader.readAsText(file);
  }

  private getPdfName(file: File) {
    this.docText = 'PDF: "' + file.name + '"';
  }
}
