// JavaScript Document
$(document).ready(function (e) {
    //gotop， godown
    $(".fixedshare .gotop").click(function () {
        $('body', 'html').animate({scrollTop: 0}, 500);
        $('html').animate({scrollTop: 0}, 500);
        return false;
    });
    $(".fixedshare .godown").click(function () {
        $('body', 'html').animate({scrollTop: $(document).height()}, 500);
        $('html').animate({scrollTop: $(document).height()}, 500);
        return false;
    });
    $(".fixedshare .share2").hover(function () {
        $(this).find(".popcode").stop().fadeIn(300);
    }, function () {
        $(this).find(".popcode").stop().fadeOut(300);
    });

    //page num
    $(function () {
        $(".pagenum a").click(function () {
            var src = $(this).attr("data-src");
            $(this).addClass("on").siblings().removeClass("on");
            $('body', 'html').animate({scrollTop: $("#" + src).offset().top - 92}, 500);
            $('html').animate({scrollTop: $("#" + src).offset().top - 92}, 500);
        });
    });
    //select
    $('[name="nice-select"]').click(function (e) {
        $('[name="nice-select"]').find('ul').hide();
        $(this).find('ul').show();
        e.stopPropagation();
    });
    $('[name="nice-select"] li').hover(function (e) {
        $(this).toggleClass('on');
        e.stopPropagation();
    });
    $('[name="nice-select"] li').click(function (e) {
        var val = $(this).text();
        $(this).parents('[name="nice-select"]').find('input').val(val);
        $('[name="nice-select"] ul').hide();
        e.stopPropagation();
    });
    $(document).click(function () {
        $('[name="nice-select"] ul').hide();
    });
    //nav phone
    $(".phonebtn").click(function () {
        $("#layermask").fadeIn(300);
        $(this).parent().find(".nav").addClass("navshow");
    });
    $("#layermask .layerclose").click(function () {
        $(".header .nav").removeClass("navshow");
        $(this).parent().fadeOut(300);
    });
    //detailgotop
    $("#Dgotop").click(function () {
        $("body,html").animate({scrollTop: 0}, 500);
        return false;
    });

});