# Additional Styling on top of zord:

### You can set global styles and use classNames to inherit them using this pattern:

```
globalStyle('light-font', {
  fontWeight: 300,
  fontFamily: "'ptRegular', Arial, Helvetica, sans-serif!important",
  color: 'green'
})
```

### Vanilla Css

Of course you can always just write vanilla css! the className prop accepts an array on any zord element:

```
className={['style-a-written-in-vanilla-css', styleBWrittenInVanillaExtractSyleSheet]}
```

Also setting some global css variables is a good way to go for colors etc.

css variables can also be responsive with breakpoints.
