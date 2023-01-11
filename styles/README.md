# Additional styling on top of zord:

If you want to make modifications to the core design system elements in zord, feel free to make changes to the components directly in the @zord dir. Note that substantive changes to sizing and/or layout may affect components that implement them, so be careful to check where they're in use and adapt accordingly.

### You can set global styles and use classNames to inherit them using this pattern:

```
globalStyle('light-font', {
  fontWeight: 300,
  fontFamily: "'ptRegular', Arial, Helvetica, sans-serif!important",
  color: 'green'
})
```

### Vanilla CSS

Of course you can always just write vanilla CSS! the className prop accepts an array on any zord element:

```
className={['style-written-in-vanilla-css', styleBWrittenInVanillaExtractSyleSheet]}
```

Also setting some global CSS variables is a good way to go for colors etc.

CSS variables can also be responsive with breakpoints.
