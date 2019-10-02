import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { ThrowStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroUrl = 'api/heroes';

  constructor(
    private http: HttpClient, // HttpClient가 반환하는 모든 것은 Observable로 반환한다.
    private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroUrl)
    .pipe(
      tap( _ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
// GET: id에 해당하는 히어로 데이터 가져오기. 존재하지 않으면 404를 반환
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  // PUT: 서버에 저장된 히어로 데이터를 변경
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroUrl,hero, httpOptions).pipe(
      tap(_ => this.log('updated hero id=$hero id')),
      catchError(this.catchError(this.handle<any>(this.updateHero)))
    );
  }

  /**
   * Http 요청이 실패한 경우 처리
   * 애플리케이션 로직 흐름은 그대로 유지
   * @param 기본값으로 반환할 객체
   * @param operation : 실패한 동작의 이름
   * @param result : 기본값으로 반환할 객체
   */

   private handleError<T>(operation = 'operation', result?: T) {
     return (error: any): Observable<T> => {

      // TODO: 리모트 서버로 에러 메시지 보내기
      console.error(error);

      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      this.log(`${operation} failed: ${error.message}`);

      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환
      return of(result as T);
    };
   }
}
