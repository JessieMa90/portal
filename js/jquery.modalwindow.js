(function (wind, $) {
    (function ($, h, c) { var a = $([]), e = $.resize = $.extend($.resize, {}), i, k = "setTimeout", j = "resize", d = j + "-special-event", b = "delay", f = "throttleWindow"; e[b] = 10; e[f] = true; $.event.special[j] = { setup: function () { if (!e[f] && this[k]) { return false } var l = $(this); a = a.add(l); $.data(this, d, { w: l.width(), h: l.height() }); if (a.length === 1) { g() } }, teardown: function () { if (!e[f] && this[k]) { return false } var l = $(this); a = a.not(l); l.removeData(d); if (!a.length) { clearTimeout(i) } }, add: function (l) { if (!e[f] && this[k]) { return false } var n; function m(s, o, p) { var q = $(this), r = $.data(this, d); r.w = o !== c ? o : q.width(); r.h = p !== c ? p : q.height(); n.apply(this, arguments) } if ($.isFunction(l)) { n = l; return m } else { n = l.handler; l.handler = m } } }; function g() { i = h[k](function () { a.each(function () { var n = $(this), m = n.width(), l = n.height(), o = $.data(this, d); if (m !== o.w || l !== o.h) { n.trigger(j, [o.w = m, o.h = l]) } }); g() }, e[b]) } })(jQuery, this);
    var Mw = function (options) {
        var opts = $.extend({}, Mw.optsDefault, options);
        var $self = this;

        var startZIndex = 10000;
        if (!wind.MW_Z_INDEX) {
            wind.MW_Z_INDEX = startZIndex;
        }
        var maskzIndex = ++wind.MW_Z_INDEX;
        var zIndex = ++wind.MW_Z_INDEX;
        var cancelBtn = {};
        var confirmBtn = {};
        var colseBtn = {};
        var maskLayer = null;
        var windowBox = null;
        var titleElm = null;
        var contentElm = null;
        var toolElm = null;
        var underlayElm = null;

        var isRender = false;
        var mwId = "MW_" + new Date().getTime() + Math.random();

        $self.form = null;
        $self.content = null;
        var render = function () {
            if (opts.isTips) {
                opts.theme = 'tips';
            }
            var themeClass = opts.theme ? 'mw-window-' + opts.theme : '';
            var maskThemeClass = opts.theme ? 'mw-mask-' + opts.theme : '';
            var underlayThemeClass = opts.theme ? 'mw-window-underlay-' + opts.theme : '';

            underlayElm = $("<div>").attr({ "class": "mw-window " + themeClass + ' ' + underlayThemeClass }).css("z-index", maskzIndex);
            windowBox = $("<div>").attr({ "id": mwId, "class": "mw-window " + themeClass }).css("z-index", zIndex);
            windowBox.resize(function () {

                underlayElm.width(windowBox.width());
                underlayElm.height(windowBox.height());
            });
            if (opts.width) {
                windowBox.css('width', opts.width + 'px');
                underlayElm.css('width', opts.width + 'px');
            }
            if (opts.height) {
                windowBox.css('height', opts.height + 'px');
                underlayElm.css('height', opts.height + 'px');
            }
            titleElm = $("<div>").attr("class", "mw-title").append(("<h3>" + opts.titleText + "</h3>"));
            colseBtn = $("<a class='mw-close'></a>");
            colseBtn.click(function () { $self.close() });
            titleElm.append(colseBtn);

            contentElm = $("<div>").attr("class", "mw-content");
            if (opts.contentText) {
                contentElm.append(opts.contentText);
            }
            if (opts.contentjQuery) {
                if (typeof opts.contentjQuery === 'string') {
                    contentElm.append($(opts.contentjQuery).show());
                }
                else if (opts.contentjQuery instanceof jQuery) {
                    contentElm.append(opts.contentjQuery.show());
                }
            }
            if (opts.contentUrl) {
                contentElm.load(opts.contentUrl);
            }
            toolElm = $("<div>").attr("class", "mw-tool");
            if (opts.hideTools) {
                toolElm.hide();
            }
            cancelBtn = $("<button type='button'>").text(opts.cancelBtnText).addClass("mw-cancelBtn")
                .click(function () {
                    $self.close();
                    if (opts.onCancel && typeof opts.onCancel === "function") {

                        opts.onCancel.call($self);
                    }
                });
            confirmBtn = $("<button type='button'>").text(opts.confirmBtnText).addClass("mw-confirmBtn")
                .click(function () {
                    if (opts.isCloseWhileConfirm)
                        $self.close();
                    if (opts.onConfirm && typeof opts.onConfirm === "function") {
                        opts.onConfirm.call($self);
                    }
                });
            if (opts.isConfirmBtnOnly) {
                cancelBtn.hide();
            } else {
                //cancelBtn.show();
            }
            toolElm.append(confirmBtn).append(cancelBtn);
            windowBox.append(titleElm).append(contentElm).append(toolElm);
            $(document.body).append(windowBox.hide(), underlayElm.hide());
            if (!opts.isTips) {
                maskLayer = maskLayer || $("<div>").attr({ "id": "Mask_" + mwId, "class": "mw-mask " + maskThemeClass }).css("z-index", maskzIndex);
                $(document.body).append(maskLayer);
            }
           
            $(window).resize(function () {
                if ($self.isOpen)
                    adjustPosition();
            });
            $.content = contentElm;
            $self.form = contentElm.find("form").get(0);
            isRender = true;
            return $self;
        }
        function adjustPosition() {
            var ww = $(window).width();
            var bw = windowBox.width();

            var wh = $(window).height();
            var bh = windowBox.height();

            windowBox.css("left", (ww - bw) / 2 + "px");
            underlayElm.css("left", (ww - bw) / 2 + "px");
            if (opts.central) {
                windowBox.css("top", (wh - bh) / 2 + "px");
                underlayElm.css("top", (wh - bh) / 2 + "px");
            }
        }
        function effect_in() {
            
            underlayElm.width(windowBox.width());
            underlayElm.height(windowBox.height());
            switch (opts.effect) {
                case 'slide': {
                    underlayElm.slideDown();
                    windowBox.slideDown();

                    
                    break;
                }
                case 'fade': {
                    underlayElm.fadeIn();
                    windowBox.fadeIn();
                    
                    break;
                }

                default: {
                    underlayElm.show();
                    windowBox.show();

                }
            }
        }
        function effect_out() {
            
            switch (opts.effect) {
                case 'slide': {
                    underlayElm.slideUp();
                    windowBox.slideUp();
                    break;
                }
                case 'fade': {
                    underlayElm.fadeOut();
                    windowBox.fadeOut();
                    break;
                }
                default: {
                    underlayElm.hide();
                    windowBox.hide();
                }
            }
        }
        $self.onCancel = function (fn) {
            opts.onCancel = fn;
            return $self;
        }
        $self.onConfirm = function (fn, closeWhileConfirm) {
            opts.onConfirm = fn;
            opts.isCloseWhileConfirm = arguments[1] === undefined ? true : closeWhileConfirm;
            return $self;
        }
        $self.onClose = function (fn) {
            opts.onClose = fn;
            return $self;
        }
        $self.setTitle = function (text) {
            opts.titleText = text;
            if (isRender) titleElm.firstChild.html(opts.titleText);
            return $self;
        }
        $self.setContentText = function (html) {
            opts.contentText = html;
            if (isRender) contentElm.html(opts.contentText);
            return $self;
        }
        $self.setContentjQuery = function (jq) {
            opts.contentjQuery = jq;
            if (isRender) {
                if (opts.contentjQuery) {
                    if (typeof opts.contentjQuery === 'string') {
                        contentElm.append($(opts.contentjQuery).show());
                    }
                    else if (opts.contentjQuery instanceof jQuery) {
                        contentElm.append(opts.contentjQuery.show());
                    }
                }
            }
            return $self;
        }
        $self.cancelText = function (text) {
            opts.cancelBtnText = text;
            if (isRender) cancelBtn.text(opts.cancelBtnText);
            return $self;
        }
        $self.confirmText = function (text) {
            opts.confirmBtnText = text;
            if (isRender) confirmBtn.text(opts.confirmBtnText);
            return $self;
        }
        $self.confirmOnly = function (b) {
            opts.isConfirmBtnOnly = arguments.length === 0 ? true : b;
            if (isRender) {
                if (opts.isConfirmBtnOnly) {
                    cancelBtn.hide();
                } else {
                    cancelBtn.show();
                }
            }
            return $self;
        }
        $self.disposeWhileClose = function () {
            opts.isDisposeWhileClose = true;
            return $self;
        }
        $self.noTools = function () {

        }
        $self.autoClose = function (millisecond) {
            opts.autoClose = millisecond;
            return $self;
        }
        $self.open = function () {
            if (!isRender)
                render();
            adjustPosition();
            effect_in();
            if (maskLayer)
                maskLayer.show();
            $self.isOpen = true;

            if (opts.autoClose) {
                setTimeout(function () { $self.close(); }, opts.autoClose);
            }
            return $self;
        }
        $self.close = function (dispose) {
            if (opts.onClose && typeof opts.onClose === 'function') {
                opts.onClose.call($self);
            }
            effect_out();
            $self.isOpen = false;
            if (maskLayer)
                maskLayer.hide();

            var isDispose = arguments.length === 0 ? false : dispose;
            if (opts.isDisposeWhileClose || isDispose) {
                $self.dispose();
            }
        }
        $self.dispose = function () {
            windowBox.remove();
            underlayElm.remove();
            if (maskLayer)
                 maskLayer.remove();
            var index = window.MWArray.indexOf($self);
            if (index < 0) {
                delete $self;
                return;
            }
            window.MWArray.slice(index, 1);

            delete $self;
        }
        $self.addButtonBefore = function (text, onclick, attrs, csss) {
            if (!isRender)
                render();
            var btn = $("<button>").text(text)
            if (onclick && typeof onclick === 'function') {
                btn.click(function () {
                    onclick.call($self);
                });
            }
            if (attrs) {
                btn.attr(attrs);
            }
            if (csss) {
                btn.css(csss);
            }
            btn.prependTo(toolElm);
            return $self;
        }
        $self.addButton = function (text, onclick, attrs, csss) {
            if (!isRender)
                render();
            var btn = $("<button>").text(text)
            if (onclick && typeof onclick === 'function') {
                btn.click(function () {
                    onclick.call($self);
                });
            }
            if (attrs) {
                btn.attr(attrs);
            }
            if (csss) {
                btn.css(csss);
            }
            btn.appendTo(toolElm);
            return $self;
        }
        $self.addLink = function (text, onclick, attrs, csss) {
            if (!isRender)
                render();
            var btn = $("<a>").text(text)
            if (onclick && typeof onclick === 'function') {
                btn.click(function () {
                    onclick.call($self);
                });
            }
            if (attrs) {
                btn.attr(attrs);
            }
            if (csss) {
                btn.css(csss);
            }
            btn.appendTo(toolElm);
            return $self;
        }
        $self.hideConfirmButton = function () {
            if (!isRender)
                render();
            confirmBtn.hide();
            return $self;
        }
        $self.hideTools = function () {
            if (!isRender)
                render();
            toolElm.hide();
            return $self;
        }
        $self.loadUrl = function (url) {
            contentElm.load(url);
            return $self;
        }

        if (!wind.MWArray) {
            wind.MWArray = [];
        }
        wind.MWArray.push($self);
        return $self;
    }

    Mw.optsDefault = {
        titleText: 'Title', //标题文字
        contentText: '', //内容
        contentjQuery: null, //jQuery或选择器
        width: undefined,//窗口宽度 px
        height: undefined,//窗口高度px
        central:false,//居中window
        cancelBtnText: '取消', //取消按钮的文字
        confirmBtnText: '确定', //确定按钮的文字
        isConfirmBtnOnly: false, //是否仅显示确定按钮
        isCloseWhileConfirm: true, //点击确定时是否关闭MW窗口
        isDisposeWhileClose: false, //关闭时是否销毁MW
        effect: 'none',//进退场效果
        hideTools: false,//隐藏工具按钮
        onCancel: undefined,//取消时执行的function
        onConfirm: undefined,//确定时执行的function
        onClose: undefined,//关闭时触发
        theme: 'default',//主题
        isTips: false,//Tips模式
        autoClose: undefined,//自动关闭延时时间（毫秒）0或不指定则禁用自动关闭功能
        contentUrl: undefined,//内容来源URL,会覆盖contentText或contentjQuery的内容
    }
    $.Mw = $.fn.Mw = function (options) {
        return new Mw(options);
    }

}(window, jQuery));


