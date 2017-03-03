import 'core-js';
import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

import { InfiniteScrollModule } from '@sisisin/ng-infinite-scroll';

@Component({
  selector: 'my-app',
  template: `
<div style="height: 300px; width: 300px;">
  <infinite-scroll [onAdd]="onAdd" [loadHeight]="40">
    <div items *ngFor="let num of nums">{{num}}</div>
    <div loading>now loading...</div>
  </infinite-scroll>
</div>`,
})
export class AppComponent {
  nums = Array(30).fill(0).map((v, i) => i.toString());
  onAdd = () => {
    return Observable.of(0)
      .delay(1000)
      .do(() => this.nums = this.nums.concat(Array(30).fill(0).map((v, i) => (this.nums.length + i + 1).toString())))
  }
}

@NgModule({
  imports: [BrowserModule, InfiniteScrollModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


platformBrowserDynamic().bootstrapModule(AppModule);
