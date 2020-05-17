import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SubnetService } from './subnet.service';

describe('SubnetService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: SubnetService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubnetService]
    });
    injector = getTestBed();
    service = injector.get(SubnetService);
    httpMock = injector.get(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
  
})