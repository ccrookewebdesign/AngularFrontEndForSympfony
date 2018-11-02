import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MarvelService } from './marvel.service';

describe('MarvelService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: MarvelService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarvelService]
    });
    injector = getTestBed();
    service = injector.get(MarvelService);
    httpMock = injector.get(HttpTestingController);
  });


  /* describe('#getUsers', () => {
    it('should return an Observable<User[]>', () => {
      const dummyUsers = [
        { login: 'John' },
        { login: 'Doe' }
      ];

      let characters = [];
  
      characters = service.getCharacters();
  
      const req = httpMock.expectOne(`${service.API_URL}/users`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyUsers);
    });
  }); */
  
  afterEach(() => {
    httpMock.verify();
  });
  
})