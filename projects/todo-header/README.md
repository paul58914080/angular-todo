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


