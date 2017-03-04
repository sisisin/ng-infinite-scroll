Simple infinit scroll component for Angular(version 2 or more).

# Usage

First, install package.

```
$ npm install -S @sisisin/ng-infinite-scroll
```

And import into your NgModule.

```
import { NgModule } from '@angular/core';

@NgModule({
  imports: [InfiniteScrollModule],
})
export class AppModule { }

```

Last, using your component.

```
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
  onAdd = () => {
    // on add action.
    // you can return Promise | Observable
  }
}
```

# Example

```
$ cd example/
$ npm install # NOTE: Don't use yarnpkg. see issue: https://github.com/yarnpkg/yarn/issues/685
$ npm run build && npm run serve
```

# License
MIT