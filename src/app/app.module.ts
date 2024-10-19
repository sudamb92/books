import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorComponent } from './author/author.component';
import { BooksComponent } from './books/books.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortPipe } from './sort.pipe';
import { HeaderComponent } from './header/header.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    BooksComponent,
    SortPipe,
    HeaderComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
