import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { API_ENDPOINTS } from './api-enpoint';
import { Observable, Subject } from 'rxjs';
import { IBook } from './model/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  newBookSubject = new Subject();

  constructor(private http: HttpClient) { }

  /**
   * Get author and their respective books data
   * @returns Observable
   */
  getAuthorAndBooks(): Observable<any> {
    const booksURL = environment.BASE_URL + API_ENDPOINTS.books;
    return this.http.get(booksURL);
  }

  /**
   * Return subject as Observable 
   * @returns Observable
   */
  getNewBookSubjectObservable(): Observable<any> {
    return this.newBookSubject.asObservable();
  }

  /**
   * Emit new book data
   * @param book 
   */
  setNewBook(book: IBook) {
    this.newBookSubject.next(book);
  }
}
