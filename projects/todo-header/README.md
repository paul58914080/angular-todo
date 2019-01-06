# `todo-header`

## Generate the project

The following command was used to generate the project

**`ng g application todo-header --style=scss --prefix=todo`**

## Refactor

I had to redo the module and component again to suite the naming convention for better readability. For example: by default it generates `todo-root` where as, I wanted `todo-header`.

### Generated the module 

`ng g m header`

### Generated the component 

`ng g c header`

### Update the module

```typescript
@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [
    HeaderComponent
  ],
  bootstrap: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
```

## Test

`ng test --project=todo-header`

## Run

`ng serve --project=todo-header`

## How to make it angular element (web component)

### Add todo-header as angular-element

**`ng add @angular/elements --project=todo-header`**

### Change the way we bootstrap

```typescript
export class HeaderModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const headerElement = createCustomElement(HeaderComponent, {injector: this.injector});
    customElements.define('todo-header', headerElement);
  }
}
```

### Concatenate into one sign file

**`npm install --save-dev concat fs-extra`**

### How to use shared style sheet

The best practises of web component tells us that the styles should be encapsulated within the component. This gives the possibility of hosting your component anywhere even when the style guide is not available globally.

While performing this KATA I tried to evaluate various means of solving this problem. I came up with various scenarios when I started to research about this. It basically depends on if you are using Shadow DOM or not. I am jotting down what I tried to evaluate.

#### Shared styles - With Shadow DOM

#### @import css

One way to include the styles was to have the css imported in the style. You need to note that this bundles the styles thus making the bundle heavy and thus rendering the component slower.

```scss
:host {
  @import '~bootstrap/scss/bootstrap.scss';

  .navbar-brand {
    font-weight: 200;
    font-size: 30pt;
    letter-spacing: .1em;
  }
}
```

#### @import css from cdn (desired way)

I preferred this way of having shared style guide across my platform. I chose this way so that I don't have to bundle the styles and thus my browser like chrome is smart enough not to download the shared style sheet again and again.

```scss
:host {
  @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css');


  .navbar-brand {
    font-weight: 200;
    font-size: 30pt;
    letter-spacing: .1em;
  }
}
```

#### Shared styles - Without Shadow DOM

Possibly the most easiest way is to make your component a **custom element** by doing so you get access to the global style guide. Since we made it custom elements we need ensure that there is no conflict with the outer world. Custom elements are fully supported by the webcomponentjs polyfill, which has great browser support. 

It is a simple switch the enable this encapsulation of Shadow DOM when we are ready for it

```typescript
@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
  // If you want to have Shadow DOM un-comment the following
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class HeaderComponent 
```

