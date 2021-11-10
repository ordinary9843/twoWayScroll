# twoWayScroll - Infinite loading data or images on web pages by two-way scroll

* Copyright &copy; [Jerry Chen](https://webtopian.com)
* GitHub [twoWayScroll](https://github.com/ordinary9843/twoWayScroll)
* http://www.opensource.org/licenses/mit-license.php

> Requires jQuery v1.9.1+

## Facebook Page

Follow us on Facebook for commit updates: https://www.facebook.com/jScroll.Infinite.Scrolling

## Usage

The `twoWayScroll` method is called on the selector for which you want your scrollable content contained within. For example:

```javascript
$('#twoWayScroll').twoWayScroll();
```

The `twoWayScroll` method takes an optional object literal as a parameter for overriding the default options. An example of how this can be done is shown below.

```html
<div id="infiniteScroll">
    <div class="infinite-scroll">something...</div>
    <ul class="pagination">
        <a href="#" class="page-link" rel="prev">prev</a>
        <a href="#" class="page-link" rel="next">next</a>
    </ul>
</div>
```

```javascript
$('#twoWayScroll').twoWayScroll({
    autoTrigger: true,
    replaceState: true,
    padding: 0,
    prevLoadHeight: 1.5,
    prevSelector: '.pagination .page-link[rel="prev"]',
    nextSelector: '.pagination .page-link[rel="next"]',
    contentSelector: '.infinite-scroll',
    pagingSelector: 'ul.pagination',
    loadingHtml: '<img src="loading.svg" />',
    loading: function () {
        // do something...
    },
    callback: function(url, element) {
        // do something...
    }
});
```

## Options
* `replaceState (true)` - When set to true, will enable `history.replaceState` immediate change current url params.
* `padding (0)` - The distance from the bottom of the scrollable content at which to trigger the loading of the next set of content.
* `prevLoadHeight (1)` - The distance from the bottom of the scrollable content at which to trigger the loading of the next set of content.
* `nextSelector ('a:last')` - The selector to use for finding the link which contains the href pointing to the next set of content. If this selector is not found, or if it does not contain a href attribute, jScroll will self-destroy and unbind from the element upon which it was called.
* `contentSelector ('')` - A convenience selector for loading only part of the content in the response for the next set of content. This selector will be ignored if left blank and will apply the entire response to the DOM.
* `pagingSelector ('')` - Optionally define a selector for your paging controls so that they will be hidden, instead of just hiding the next page link.
* `loadingHtml ('<small>Loading...</small>')` - The HTML to show at the bottom of the content while loading the next set.
* `loading` (false) - A JavaScript function to run after the loadingHtml has been drawn.
* `callback (false)` - Optionally define a callback function to be called after a set of content has been loaded.

For more information on the `contentSelector` option and how it loads a response fragment, see the [jQuery documentation for the .load() method](https://api.jquery.com/load/).


## LICENSES:
* MIT: http://www.opensource.org/licenses/mit-license.php