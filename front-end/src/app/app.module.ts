import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent} from './app.component';

import { environment } from '../environments/environment';

import { MatToolbarModule, MatButtonModule, MatListModule, MatIconModule,
         MatInputModule, MatCardModule, MatDialogModule } from '@angular/material';

import { Route, RouterModule } from '@angular/router';
import { SubscriptionComponent , ImageDialog} from './subscription/subscription.component';
import { AboutComponent } from './about/about.component';
import { AppService} from './app.service'
import { HttpModule } from '@angular/http'
const mat = [
  MatToolbarModule, MatButtonModule, MatListModule, MatInputModule,
  MatIconModule, MatCardModule, MatDialogModule
]


const routes: Route [] = [
  {
    path:'',
    component : SubscriptionComponent,
    pathMatch:'full'
  },
  {
    path: 'about',
    component: AboutComponent
  }
]




@NgModule({
  declarations: [
    AppComponent,
    SubscriptionComponent,
    AboutComponent,
    ImageDialog
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ...mat
  ],
  providers: [AppService ],
  bootstrap: [AppComponent],
  entryComponents: [ImageDialog]
})
export class AppModule { }
