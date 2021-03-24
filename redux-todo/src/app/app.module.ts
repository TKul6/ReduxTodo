import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { appReducer, initialState } from './state/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { TaskComponent } from './task/task.component';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ProjectTasksPipe } from './count-tasks.pipe';
import {MatIconModule} from '@angular/material/icon';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TaskEffects } from './state/tasks-effects';
import { MockBackendInterceptor } from './interceptors/mock-backend.interceptor';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ToastrModule } from 'ngx-toastr';
import { MessagesEffects } from './state/messages-effects';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ProjectTasksPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    EffectsModule.forRoot([TaskEffects, MessagesEffects]),
    HttpClientModule,
    MatProgressBarModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-left'})
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
