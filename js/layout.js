$(document).ready(function () {

    (function () {

        var modules = ['settings', 'staff', 'emolument', 'contract', 'recruit', 'document', 'kpi', 'assurance', 'dimission', 'process', 'wallet', 'namecard', 'training', 'talents', 'approval'];

        var module;
        for (var i = 0; i < modules.length; i++) {
            var m = modules[i];
            if (location.href.indexOf('/' + m ) > -1) {
                module = m;
                break;
            }
        }
        if (module) {
            //主导航
            $("a.navitem").each(function (i, n) {
                var href = n.href;
                if (href && href.indexOf(module) > -1) {
                    $(n).addClass("active");
                }
                else {
                    $(n).removeClass("active");
                }
            });
        }
        else {
            //右侧
            modules = ['activity', 'checkin', 'map', 'calendar', 'department', 'todo', 'wiki'];
            for (var i = 0; i < modules.length; i++) {
                var m = modules[i];
                if (location.href.indexOf('/' + m ) > -1) {
                    module = m;
                    break;
                }
            }
            if (module) {
                $("#asidebar > a").each(function (i, n) {
                    var href = n.href;
                    if (href && href.indexOf(module) > -1) {
                        $(n).addClass("active");
                    }
                    else {
                        $(n).removeClass("active");
                    }
                });
            }
        }
    })();


    (function () {
        //主导航滚动效果
        
        function init() {
            
            var obj = $('.navmaininner');
            obj.children().first().removeAttr('style');
            var stepWidth = obj.children(":eq(1)").offset().left - obj.children(":eq(0)").offset().left;
            var containerWidth = obj.width();
            var marginLeft, initMarginLeft;
            marginLeft = initMarginLeft = parseInt(obj.children(":eq(0)").css("margin-left").replace('px', ''));
            var canDisplayItemCount = parseInt(containerWidth / stepWidth);
            var fixDisplayWidth = canDisplayItemCount * stepWidth;
            var hiddenLeftCount = 0;

            var totalWidth = obj.children().length * stepWidth;
            var hiddenWidth = totalWidth - fixDisplayWidth;


            var hiddenRightCount = parseInt(hiddenWidth / stepWidth);

            $("#navmain > .arrow").first().unbind('click').click(function (e) { e.preventDefault(); scroll('left'); });
            $("#navmain > .arrow").last().unbind('click').click(function (e) { e.preventDefault(); scroll('right'); });
            function scroll(direction) {

                if ('left' === direction) {
                    if (marginLeft === initMarginLeft) return;
                    if (hiddenLeftCount >= canDisplayItemCount) {
                        marginLeft += stepWidth * canDisplayItemCount;
                        hiddenLeftCount -= canDisplayItemCount;
                        hiddenRightCount += canDisplayItemCount;
                    }
                    else {
                        marginLeft += stepWidth * hiddenLeftCount;
                        hiddenRightCount += hiddenLeftCount;
                        hiddenLeftCount = 0;
                    }
                    obj.children().first().animate({ marginLeft: marginLeft + 'px' }, 'slow');
                }
                else {
                    if ((Math.abs(marginLeft) + initMarginLeft) >= hiddenWidth) return;
                    if (hiddenRightCount >= canDisplayItemCount) {
                        marginLeft -= stepWidth * canDisplayItemCount;
                        hiddenRightCount -= canDisplayItemCount;
                        hiddenLeftCount += canDisplayItemCount;
                    }
                    else {
                        marginLeft -= stepWidth * hiddenRightCount;
                        hiddenLeftCount += hiddenRightCount;
                        hiddenRightCount = 0;
                    }
                    obj.children().first().animate({ marginLeft: marginLeft + 'px' }, 'slow');

                }
                setArrowState();

            }
            function setArrowState() {
                if (hiddenLeftCount <= 0) {
                    $("#navmain > .arrow").first().css('color', '#ccc');
                }
                else {
                    $("#navmain > .arrow").first().css('color', '#666');
                }
                if (hiddenRightCount <= 0) {
                    $("#navmain > .arrow").last().css({ 'color': '#ccc', 'visibility': 'hidden' });
                }
                else {
                    $("#navmain > .arrow").last().css({ 'color': '#666', 'visibility': 'visible' });
                }
            }
            function moveActiveIntoView() {
                var activeItem = obj.children(".active");
                if (activeItem.length == 0) return;
                var posi = activeItem.offset().left;
                var toTheLeft = posi - (obj.offset().left + containerWidth);
                if (toTheLeft >= 0) {
                    var c = parseInt(toTheLeft / stepWidth) + 1;
                    var mleft = stepWidth * c;
                    obj.children().first().css({ 'margin-left': (marginLeft -= mleft) + 'px' });
                    hiddenLeftCount += c;
                    hiddenRightCount -= c;
                }

            }
            moveActiveIntoView();
            setArrowState();

        }
        $(window).resize(function () {
            init();
        });
        init();
        $(document).bind('change.navi', function () { init(); });
    })();

    $(".handler").click(function () {
        var notificationWidth = $("#notification .container").width(), asidebarWidth = $("#asidebar").width();
        var $i = $(this);
        if (!$i.attr("expend")) {
            $("#notification").animate({ right: asidebarWidth + 'px' }, 'fast', function () {
                $i.attr("expend", "expend").addClass("arrow-posi-adjust").children("i").removeClass("icon-slide-left").addClass("icon-slide-right");
            });
        }
        else {
            $("#notification").animate({ right: (-notificationWidth + asidebarWidth) + 'px' }, 'fast', function () {
                $i.removeAttr("expend").removeClass("arrow-posi-adjust").children("i").removeClass("icon-slide-right").addClass("icon-slide-left");
            });
        }
    });

    $("[data-nobubble]").bind('click', function (e) {
        return false;
    });

});

function shownotice() {

    $.Mw({
        contentText: '<i class="fa fa-exclamation-circle tips-error"></i><div>功能升级中，敬请期待！</div>',
        isTips: true,
        central: true,
        autoClose: 2000

    }).disposeWhileClose()
        .open();

}

