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

It is a simple switch to enable this encapsulation of Shadow DOM when we are ready for it

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

## Including the web-component

While I tried to include the generated web component in the projects (angular and non-angular) I faced some challenges. I will briefly touch base on the challenges I faced in them and the ways I resolved them.

### Including within another angular project

Had to remove bootstrap because it would conflict, instead declared it in **`entryComponents`**

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
  entryComponents: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
```

Need to declare **`CUSTOM_ELEMENTS_SCHEMA`** in the component that uses the web-component and removed the import of **`TodoHeaderModule`**

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TodoViewModule,
    TodoCreateModule
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
```

Since we are using this as a web-component, I had to modify the **`angular.json`** in the build section of the component that uses it, in this case the todo application by adding in the scripts the **`todo-header.js`**

```json
{
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
    "options": {
      "outputPath": "dist/angular-todo",
      "index": "src/index.html",
      "main": "src/main.ts",
      "polyfills": "src/polyfills.ts",
      "tsConfig": "src/tsconfig.app.json",
      "assets": [
        "src/favicon.ico",
        "src/assets"
      ],
      "styles": [
        "src/styles.scss"
      ],
      "scripts": [
        "elements/todo-header.js"
      ]
    }
  }
}
```

I encountered transpilation issues like below when I tried to access the web-component

> `TypeError: Failed to construct 'HTMLElement': Please use the 'new' operator, this DOM object constructor cannot be called as a function.`

To get over it, thanks to the blog [Angular Elements TypeScript transpilation issues -  **Marko Hrovatič**](https://medium.com/@brgrz/angular-elements-typescript-transpilation-issues-62b0e441a7b9) I used **`es6`** in my **`tsconfig.json`** 

```json
{
  "compilerOptions": {
    target: "es6"
  }
}
```

Another challenge that I encountered was the duplication of **`zone.js`** between the `todo` application and the `todo-header` (web-component). To fix it, I had to comment it in the file **`todo-header/src/polyfills.ts`** the inclusion of **`zone.js`** as this is already included in the `todo` application. Though this is a workaround I am keen on the fix being released

```json
// FIXME : https://github.com/angular/angular/issues/24466
// When you want to host this in another angular project then zone should be commented. If you are hosting in a non-angular project where zone is not referenced then un-commented the following
// import 'zone.js/dist/zone'; // Included with Angular CLI.
```

### Including in another non-angular project

For the non-angular project which does not have **`zone.js`** referenced in it, all I had to do was to include **`zone.js`**

```html
<html>
  <body>
    <todo-header></todo-header>
  </body>
  <script type="text/javascript" src="https://unpkg.com/zone.js"></script>
  <script type='text/javascript' src='todo-header.js'></script>
</html>
```
