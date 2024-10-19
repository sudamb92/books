import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorService } from '../author.service';
import { AuthorComponent } from './author.component';
import { SortPipe } from '../sort.pipe';
import { of } from 'rxjs';

xdescribe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;
  let authorServiceMock = jasmine.createSpyObj('AuthorService', ['getAuthorAndBooks', 'getNewBookSubjectObservable']);
  let sortPipeMock = jasmine.createSpyObj('SortPipe', ['transform']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorComponent ],
      providers: [
        { provide: AuthorService, useValue: authorServiceMock },
        { provide: SortPipe, useValue: sortPipeMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    component.sortBy = 'desc'
    const mockResponse = {
      status: 'success',
      data: { name: 'Author Name', books: [] }
    };
    authorServiceMock.getAuthorAndBooks.and.returnValue(of(mockResponse));
    const mockBook = { title: 'New Book', author: 'Author', year: 2023 };
    authorServiceMock.getNewBookSubjectObservable.and.returnValue(of(mockBook));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
