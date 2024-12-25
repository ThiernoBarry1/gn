import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Chat } from '../model/chat-model';
import { GptResponse } from '../model/gpt-response';
import { ConfService } from './conf.service';

@Injectable({
  providedIn: 'root',
})
export class GptService {
  apiKey = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    }),
  };

  constructor(private http: HttpClient, private confService: ConfService) {}

  sendToBoot(chatObj: Chat): Observable<GptResponse> {
    return this.http
      .post<GptResponse>(this.confService.getUrl(), chatObj, this.httpOptions)
      .pipe(
        tap((gptResponse: GptResponse) =>
          console.log(`gptResponse=`, gptResponse.id)
        ),
        catchError(this.handleError<GptResponse>('sendMessage'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
