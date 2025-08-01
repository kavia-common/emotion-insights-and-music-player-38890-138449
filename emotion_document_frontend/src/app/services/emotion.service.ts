import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// PUBLIC_INTERFACE
@Injectable({
  providedIn: 'root'
})
/**
 * Service to handle document upload and retrieve emotion insights and music recommendation from backend.
 */
export class EmotionService {
  private apiBase = '/api'; // Replace with backend URL if on a different origin

  constructor(public http: HttpClient) {
    // Reference http to avoid unused warning
    void this.http;
  }

  // PUBLIC_INTERFACE
  /**
   * Upload a document file (txt/pdf) and track progress.
   * @param file Document file (.txt or .pdf)
   */
  uploadDocument(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('document', file);
    return this.http.post<any>(`${this.apiBase}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * (event.loaded / (event.total ?? 1)));
          return { status: 'progress', percent: percentDone };
        } else if (event.type === HttpEventType.Response) {
          return { status: 'done', body: event.body };
        }
        return event;
      }),
      catchError(this.handleError)
    );
  }

  // PUBLIC_INTERFACE
  /**
   * Get extracted emotions and music info (for a given document id or name).
   */
  getEmotionResult(documentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiBase}/result/${encodeURIComponent(documentId)}`).pipe(
      catchError(this.handleError)
    );
  }

  // PUBLIC_INTERFACE
  private handleError(error: HttpErrorResponse) {
    let errMsg = 'Unknown error';
    if (error.error instanceof ErrorEvent) {
      errMsg = `Client error: ${error.error.message}`;
    } else if (error.error && error.error.detail) {
      errMsg = error.error.detail;
    } else {
      errMsg = `Server returned code ${error.status}`;
    }
    return throwError(() => errMsg);
  }
}
