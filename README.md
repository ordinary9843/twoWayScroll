# twoWayScroll - Infinite loading data or images on web pages by two-way scroll

## Source
* [GitHub](https://github.com/ordinary9843/twoWayScroll)
* [npm](https://www.npmjs.com/package/two-way-scroll)

## Requires
> jQuery v1.9.1+

## Usage
The `twoWayScroll` method is called on the selector for which you want your scrollable content contained within. For example:

```javascript
$('#twoWayScroll').twoWayScroll();
```

The `twoWayScroll` method takes an optional object literal as a parameter for overriding the default options. An example of how this can be done is shown below.

```html
<div id="twoWayScroll">
    <div class="two-way-scroll">data or images</div>
    <ul class="pagination">
        <a href="#" class="page-link" rel="prev">prev</a>
        <a href="#" class="page-link" rel="next">next</a>
    </ul>
</div>
```

```javascript
$('#twoWayScroll').twoWayScroll({
    padding: 0,
    prevLoadHeight: 1,
    prevSelector: '.pagination .page-link[rel="prev"]',
    nextSelector: '.pagination .page-link[rel="next"]',
    contentSelector: '.two-way-scroll',
    pagingSelector: 'ul.pagination',
    loadingHtml: '<div>Loading...</div>',
    done: function(url, element) {
        $('ul.pagination').hide(); // hide your pagination
    }
});
```

## Options
* `replaceState (true)` - When set to true, will enable `history.replaceState` immediate change current url params.
* `padding (0)` - The distance from the bottom of the scrollable content at which to trigger the loading of the next set of content.
* `prevLoadHeight (1)` - The distance from the bottom of the scrollable content at which to trigger the loading of the prev set of content.
* `prevSelector ('.pagination .page-link[rel="prev"]')` - The selector to use for finding the link which contains the href pointing to the prev set of content. If this selector is not found, or if it does not contain a href attribute, twoWayScroll will self-destroy and unbind from the element upon which it was called.
* `nextSelector ('.pagination .page-link[rel="next"]')` - The selector to use for finding the link which contains the href pointing to the next set of content. If this selector is not found, or if it does not contain a href attribute, twoWayScroll will self-destroy and unbind from the element upon which it was called.
* `contentSelector ('.two-way-scroll')` - A convenience selector for loading only part of the content in the response for the next set of content. This selector will be ignored if left blank and will apply the entire response to the DOM.
* `pagingSelector ('ul.pagination')` - Optionally define a selector for your paging controls so that they will be hidden, instead of just hiding the next page link.
* `loadingHtml ('<div>Loading...</div>')` - The HTML to show at the bottom of the content while loading the next set.
* `loading` (false) - A JavaScript function to run after the loadingHtml has been drawn.
* `done (false)` - Optionally define a callback function to be called after a set of content has been loaded.

For more information on the `contentSelector` option and how it loads a response fragment, see the [jQuery documentation for the .load() method](https://api.jquery.com/load/).


## Licenses
(The [MIT](http://www.opensource.org/licenses/mit-license.php) License)

Copyright &copy; [Jerry Chen](https://ordinary9843.medium.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE