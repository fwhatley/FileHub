import { Injectable } from '@angular/core';
import { MOCK_FILE_RECORDS } from './mock-file-records';
import { FileRecord } from '../model/FileRecord';
import { Observable, of } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileRecordService {

  private baseFileRecordsUrl = 'http://localhost:5000/api/files';
  private downloadUrl = `${this.baseFileRecordsUrl}/downloadsFile`;

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  // ====================== private methods ========================
  private log(message: string) {
    this.messageService.add(`FileRecordService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue. https://angular.io/tutorial/toh-pt6
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  // =============== public methods =================================
  public getFileRecords(): Observable<FileRecord[]> {

    return this.http.get<FileRecord[]>(this.baseFileRecordsUrl)
      .pipe( // tap allows you to see the data, not modify
        tap(fileRecords => this.log(`fectched file records`)), // ${JSON.stringify(fileRecords)} // to print the request contents
        catchError(this.handleError('getFileRecords()', []))
    );

  }




}
