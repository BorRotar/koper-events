import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {SwapiService} from './swapi';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SwapiService],
    });

    service = TestBed.inject(SwapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data using GET method from the correct URL', () => {
    const dummyData = { name: 'Luke Skywalker', id: '1' };
    const resource = 'people';
    const id = '1';

    service.getResource(resource, id).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/${resource}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should handle error response correctly', () => {
    const resource = 'people';
    const id = '2';

    service.getResource(resource, id).subscribe(
      () => fail('expected an error, not data'),
      (error: string) => {
        expect(error).toContain('Server returned code: 404');
      }
    );

    const req = httpMock.expectOne(`http://localhost:3000/api/${resource}/${id}`);

    req.flush('Error fetching data', {
      status: 404,
      statusText: 'Not Found',
    });
  });
});
