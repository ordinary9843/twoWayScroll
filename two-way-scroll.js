/*
 * twoWayScroll - Infinite loading data or images on web pages by two-way scroll
 *
 * @copyright Jerry Chen
 * @license MIT License
 * @author Jerry Chen (https://github.com/ordinary9843/twoWayScroll)
 * @version 1.0.0
 * @requires jQuery v1.9.1+
 */
(function ($) {

    'use strict';

    $.twoWayScroll = {
        defaults: {
            replaceState: true,
            padding: 0,
            prevLoadHeight: 1.5,
            prevSelector: 'a:first',
            nextSelector: 'a:last',
            contentSelector: '',
            pagingSelector: '',
            loadingHtml: '<span>Loading</span>',
            loading: false,
            callback: false
        }
    };

    let twoWayScroll = function (_e, options) {
        let _data = _e.data('twoWayScroll'),
            _userOptions = (typeof options === 'function') ? { callback: options } : options,
            _options = $.extend({}, $.twoWayScroll.defaults, _userOptions, _data || {}),
            _isWindow = (_e.css('overflow-y') === 'visible'),
            _prev = _e.find(_options.prevSelector).first(),
            _next = _e.find(_options.nextSelector).first(),
            _window = $(window),
            _body = $('body'),
            _scroll = _isWindow ? _window : _e,
            _prevHref = $.trim(_prev.prop('href') + ' ' + _options.contentSelector),
            _nextHref = $.trim(_next.prop('href') + ' ' + _options.contentSelector),
            _preloadImage = function () {
                let src = $(_options.loadingHtml).filter('img').attr('src');

                if (src) {
                    let image = new Image();

                    image.src = src;
                }
            },
            _wrapContent = function () {
                if (!_e.find('.twoWayScroll-inner').length) {
                    _e.contents().wrapAll('<div class="twoWayScroll-inner" />');
                }
            },
            _wrap = function (target) {
                let parent;

                if (_options.pagingSelector) {
                    target.closest(_options.pagingSelector).hide();
                } else {
                    parent = target.parent().not('.twoWayScroll-inner, .twoWayScroll-added').addClass('twoWayScroll-parent').hide();

                    if (!parent.length) {
                        target.wrap('<div class="twoWayScroll-parent" />').parent().hide();
                    }
                }
            },
            _destroy = function () {
                return _scroll.unbind('.twoWayScroll')
                    .removeData('twoWayScroll')
                    .find('.twoWayScroll-inner').children().unwrap()
                    .filter('.twoWayScroll-added').children().unwrap();
            },
            _observe = function () {
                if (_e.is(':visible')) {
                    _wrapContent();

                    let inner = _e.find('div.twoWayScroll-inner').first();
                    let data = _e.data('twoWayScroll');
                    let borderTopWidth = parseInt(_e.css('borderTopWidth'), 10);
                    let borderTopWidthInt = (isNaN(borderTopWidth)) ? 0 : borderTopWidth;
                    let containerTop = parseInt(_e.css('paddingTop'), 10) + borderTopWidthInt;
                    let topHeight = (_isWindow) ? _scroll.scrollTop() : _e.offset().top;
                    let innerTop = (inner.length) ? inner.offset().top : 0;
                    let totalHeight = Math.ceil(topHeight - innerTop + _scroll.height() + containerTop);
                    let prevUrl = 'undefined';
                    let nextUrl = 'undefined';

                    if (data.prevHref) {
                        let prevParams = data.prevHref.split(' ');

                        if (prevParams[0]) {
                            prevUrl = prevParams[0];
                        }
                    }

                    if (data.nextHref) {
                        let nextParams = data.nextHref.split(' ');

                        if (nextParams[0]) {
                            nextUrl = nextParams[0];
                        }
                    }

                    if (!data.prevWaiting && prevUrl !== 'undefined' && totalHeight + _options.padding < _window.height() / _options.prevLoadHeight) {
                        if (_options.replaceState === true) {
                            history.replaceState(null, document.title, prevUrl);
                        }

                        return _prevLoad();
                    }

                    if (!data.nextWaiting && nextUrl !== 'undefined' && totalHeight + _options.padding >= inner.outerHeight()) {
                        if (_options.replaceState === true) {
                            history.replaceState(null, document.title, nextUrl);
                        }

                        return _nextLoad();
                    }
                }
            },
            _isPrevHref = function (data) {
                data = data || _e.data('twoWayScroll');

                if (!data || !data.prevHref) {
                    return false;
                } else {
                    _bind();

                    return true;
                }
            },
            _isNextHref = function (data) {
                data = data || _e.data('twoWayScroll');
                if (!data || !data.nextHref) {
                    return false;
                } else {
                    _bind();

                    return true;
                }
            },
            _bind = function () {
                let prev = _e.find(_options.prevSelector).first();
                let next = _e.find(_options.nextSelector).first();

                if (prev.length) {
                    _wrap(prev);

                    let scrollingBodyHeight = _body.height() - _e.offset().top;
                    let scrollingHeight = (_e.height() < scrollingBodyHeight) ? _e.height() : scrollingBodyHeight;
                    let windowHeight = (_e.offset().top - _window.scrollTop() > 0) ? _window.height() - (_e.offset().top - $(window).scrollTop()) : _window.height();

                    if (scrollingHeight > windowHeight) {
                        _observe();
                    }

                    _scroll.unbind('.twoWayScroll').bind('scroll.twoWayScroll', function () {
                        return _observe();
                    });
                }

                if (next.length) {
                    _wrap(next);

                    let scrollingBodyHeight = _body.height() - _e.offset().top;
                    let scrollingHeight = (_e.height() < scrollingBodyHeight) ? _e.height() : scrollingBodyHeight;
                    let windowHeight = (_e.offset().top - _window.scrollTop() > 0) ? _window.height() - (_e.offset().top - $(window).scrollTop()) : _window.height();

                    if (scrollingHeight <= windowHeight) {
                        _observe();
                    }

                    _scroll.unbind('.twoWayScroll').bind('scroll.twoWayScroll', function () {
                        return _observe();
                    });
                }
            },
            _prevLoad = function () {
                let inner = _e.find('div.twoWayScroll-inner').first();
                let data = _e.data('twoWayScroll');

                data.prevWaiting = true;

                inner.prepend('<div class="twoWayScroll-added" />')
                    .children('.twoWayScroll-added').first()
                    .html('<div class="twoWayScroll-loading" id="twoWayScroll-loading">' + _options.loadingHtml + '</div>')
                    .promise()
                    .done(function () {
                        if (_options.loading) {
                            _options.loading();
                        }
                    });

                return _e.animate({
                    scrollTop: inner.outerHeight()
                }, 0, function () {
                    let prevHref = data.prevHref;

                    inner.find('div.twoWayScroll-added').first().load(prevHref, function (r, status) {
                        if (status === 'error') {
                            return _destroy();
                        }

                        let prev = $(this).find(_options.prevSelector).first();

                        data.prevWaiting = false;
                        data.prevHref = (prev.prop('href')) ? $.trim(prev.prop('href') + ' ' + _options.contentSelector) : false;

                        $('.twoWayScroll-parent', _e).remove();

                        _window.scrollTop($(window).height());

                        _isPrevHref();

                        if (_options.callback) {
                            let response = prevHref.split(' ');
                            let url = response[0];
                            let element = response[1];
                            
                            _options.callback.call(this, url, element);
                        }
                    });
                });
            },
            _nextLoad = function () {
                let inner = _e.find('div.twoWayScroll-inner').first();
                let data = _e.data('twoWayScroll');

                data.nextWaiting = true;

                inner.append('<div class="twoWayScroll-added" />')
                    .children('.twoWayScroll-added').last()
                    .html('<div class="twoWayScroll-loading" id="twoWayScroll-loading">' + _options.loadingHtml + '</div>')
                    .promise()
                    .done(function () {
                        if (_options.loading) {
                            _options.loading();
                        }
                    });

                return _e.animate({
                    scrollTop: inner.outerHeight()
                }, 0, function () {
                    let nextHref = data.nextHref;

                    inner.find('div.twoWayScroll-added').last().load(nextHref, function (r, status) {
                        if (status === 'error') {
                            return _destroy();
                        }

                        let next = $(this).find(_options.nextSelector).first();

                        data.nextWaiting = false;
                        data.nextHref = (next.prop('href')) ? $.trim(next.prop('href') + ' ' + _options.contentSelector) : false;

                        $('.twoWayScroll-parent', _e).remove();

                        _isNextHref();

                        if (_options.callback) {
                            let response = nextHref.split(' ');
                            let url = response[0];
                            let element = response[1];

                            _options.callback.call(this, url, element);
                        }
                    });
                });
            };

        _e.data('twoWayScroll', $.extend({}, _data, {
            initialized: true,
            prevWaiting: false,
            nextWaiting: false,
            prevHref: _prevHref,
            nextHref: _nextHref
        }));

        _wrapContent();
        _preloadImage();
        _bind();

        $.extend(_e.twoWayScroll, {
            destroy: _destroy
        });

        return _e;
    };

    $.fn.twoWayScroll = function (m) {
        return this.each(function () {
            let ele = $(this);
            let data = ele.data('twoWayScroll');

            if (data && data.initialized) {
                return;
            }

            twoWayScroll(ele, m);
        });
    };
})(jQuery);