import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user by email', () => {
    const mockEmail = 'test@example.com';
    const mockUser = { id: '1', email: mockEmail };

    service.login(mockEmail).subscribe((user: any) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should create a user', () => {
    const mockEmail = 'new@example.com';
    const mockUser = { id: '2', email: mockEmail };

    service.createUser(mockEmail).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: mockEmail });
    req.flush(mockUser);
  });
});
