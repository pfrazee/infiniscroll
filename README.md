# Infinite Scroll Web Widget

Create/decorate an element which loads more content automatically when the scroll position reaches either the top or bottom.


```js
var infiniscroll = require('infiniscroll')
var el = infiniscroll('div', {
  fetchTop: function (cb) {
    el.insertBefore(renderMoreTop(), el.firstChild)
    cb()
  },
  fetchBottom: function (cb) {
    el.appendChild(renderMoreBottom())
    cb()
  }
})
```

Notes:

- `fetchTop` and `fetchBottom` are optional
- the first param may be a tagname, hyperscript template string, or existing DOM element

## LICENSE

MIT