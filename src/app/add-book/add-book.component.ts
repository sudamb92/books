import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  @Output() cancelBookRequest = new EventEmitter();
  addBookForm!: FormGroup;

  constructor(private fb: FormBuilder, private authorService: AuthorService) { 
    this.addBookForm = this.fb.group({
      imageUrl: ['', Validators.required],
      title: ['', Validators.required],
      purchaseLink: ['', Validators.required],
      PublishDate: ['', Validators.required]
    })
  }

  get f() {
    return this.addBookForm.value;
  }

  /**
   * Cancel to add new book request
   */
  cancelToAddNewBookHandler() {
    this.cancelBookRequest.emit();
  }
  
  /**
   * Submit new book data in other words pass new book data to subject 
   */
  submit() {
    this.authorService.setNewBook(this.addBookForm.value);
    this.cancelBookRequest.emit();
  }

  ngOnInit(): void {
  }

}
