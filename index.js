'use strict'
var h = require('hyperscript')
var multicb = require('multicb')


module.exports = function (el, opts) {
  opts = opts || {}
  if (!opts)
    throw new Error('Infiniscroll requires an `opts` object, please see https://github.com/pfraze/infiniscroll for usage')

  if (typeof el == 'string')
    el = h(el)
  el.onscroll  = onscroll

  var atTop = true
  var fetching = false
  function onscroll (e) {
    if (fetching)
      return

    // toggle "scrolled" class
    if (atTop && el.scrollTop > 0) {
      atTop = false
      el.classList.add('scrolled')
    } else if (!atTop && el.scrollTop === 0) {
      atTop = true
      el.classList.remove('scrolled')
    }

    if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
      // hit bottom
      if (typeof opts.fetchBottom == 'function') {
        fetching = true
        opts.fetchBottom(function (err) {
          fetching = false
          if (err)
            console.error(err)
        })
      }
    }
    else if (el.scrollTop <= 1) {
      // hit top
      if (typeof opts.fetchTop == 'function'){
        fetching = true
        opts.fetchTop(function (err) {
          fetching = false
          el.scrollTop = 1          
          if (err)
            console.error(err)
        })
      }
    }
  }

  return el
}
