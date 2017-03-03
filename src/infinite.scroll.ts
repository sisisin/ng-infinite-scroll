import { NgModule, Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'infinite-scroll',
  template: `
<div class="wrapper" [style.height]="height" [style.width]="width" #wrapper>
  <div class="container" #container>
    <ng-content select="[items]"></ng-content>
    <ng-content select="[loading]" *ngIf="loading"></ng-content>
  </div>
</div>`,
  styles: [
    '.wrapper { margin: 0; padding: 0; width: 100%; height: 100%; overflow-y: scroll; }',
    '.container { width: 100%; }',
  ]
})
export class InfiniteScrollComponent implements OnInit {
  @Input() height: number;
  @Input() width: number;
  @Input() onAdd: () => Promise<void> | Observable<void>;
  @Input() loadHeight: number;
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('container') container: ElementRef;
  loading = false;
  constructor() { }

  ngOnInit() {
    Observable
      .fromEvent<UIEvent>(this.wrapper.nativeElement, 'scroll')
      .map(e => <HTMLElement>e.target)
      .filter(el => this.loading === false && el.scrollHeight - (el.scrollTop + el.clientHeight) < this.loadHeight)
      .subscribe(e => {
        this.loading = true;

        const add = this.onAdd();
        if (add && typeof (<Promise<void>>add).then === 'function') {
          (<Promise<void>>add).then(() => { this.loading = false }, () => { this.loading = false });
        } else if (add && typeof (<Observable<void>>add).subscribe === 'function') {
          (<Observable<void>>add).subscribe(null, null, () => this.loading = false);
        } else {
          this.loading = false;
        }
      });
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [InfiniteScrollComponent],
  exports: [InfiniteScrollComponent]
})
export class InfiniteScrollModule { }
