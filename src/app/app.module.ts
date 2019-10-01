import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({ // 애플리케이션 동작에 필요한 메타데이터는 보통 @NgModule 데코레이터에 지정
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule모듈은 HTTP 요청을 가로채고 서버의 응답을 흉내냅니다.
    // 실제 서버가 준비되면 이 부분을 제거하면 됩니다 .
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation : false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
