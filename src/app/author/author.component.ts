import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthorService } from '../author.service';
import { catchError, of } from 'rxjs';
import { IAuthor, IAuthorAPIResponse, IBook } from '../model/author';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { AddBookComponent } from '../add-book/add-book.component';
import { SortPipe } from '../sort.pipe';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  providers: [
    SortPipe
  ]
})
export class AuthorComponent implements OnInit {
  @ViewChild('addNewBook', { read: ViewContainerRef, static: true }) addNewBook!: ViewContainerRef;

  errorMessage: string = '';
  authorAndBooks!: IAuthor;
  faSort = faSort;
  sortBy: string = 'asc';

  constructor(private authorService: AuthorService, private sortPipe: SortPipe) { }

  /**
   * Show add new book form 
   */
  showNewBookForm() {
    this.addNewBook.clear();
    const addBookComponent = this.addNewBook.createComponent(AddBookComponent);
    addBookComponent.instance.cancelBookRequest.subscribe(() => {
      this.addNewBook.clear();
    })
  }

  /**
   * Delete book from books
   * @param book 
   */
  deleteBook(book: IBook) {
    this.authorAndBooks.books = (this.authorAndBooks.books.filter((item: IBook) => {
      return (item.title != book.title)
    }) as [IBook])
  }

  /**
   * Get/Fetch author and books data from API
   */
  getAuthorAndBooks() {
    this.authorService.getAuthorAndBooks().pipe(catchError((error) => {
      this.errorMessage = error.message;
      console.error('Failed to fetch author data' + error)
      return of()
    }))
    .subscribe((resp: IAuthorAPIResponse) => {
      if (resp.status === 'success') {
        this.authorAndBooks = resp?.data;
      } else {
        this.errorMessage = 'Failed to fetch author data';
      }
    })
  }

  /**
   * Set sortBy value based on requirement.
  */
  setSortBy() {
    if (this.sortBy === 'asc') {
      this.sortBy = 'desc'
    } else {
      this.sortBy = 'asc'
    } 
  }

  /**
   * Add new books data to books array
   */
  addNewBookDataToBooksArry() {
    this.authorService.getNewBookSubjectObservable().subscribe((book: IBook) => {
      this.authorAndBooks.books.push(book);
      this.sortPipe.transform(this.authorAndBooks.books, this.sortBy);
    })
  }
    
  ngOnInit(): void {
    this.getAuthorAndBooks();
    this.addNewBookDataToBooksArry();
  }

}
