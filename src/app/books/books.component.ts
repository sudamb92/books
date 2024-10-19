import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBook } from '../model/author';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  @Input() book!: IBook;
  @Output() deleteBookEmitter = new EventEmitter();
  faTrash = faTrash;

  constructor() { }

  deleteBookHandler() {
    this.deleteBookEmitter.emit(this.book);
  }

  ngOnInit(): void {
  }

}
