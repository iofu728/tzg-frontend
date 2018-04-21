jQuery.divselect = function (divselectid, inputselectid) {
    var inputselect = $(inputselectid);
    $(divselectid + " cite").click(function () {
        $(this).parent().toggleClass('on')
        var ol = $(divselectid + " ol");
        if (ol.css("display") == "none") {
            ol.slideDown("fast");
        } else {
            ol.slideUp("fast");
        }
    });
    $(divselectid + " ol li a").click(function () {
        var txt = $(this).text();
        $(divselectid + " cite").html(txt);
        var value = $(this).attr("selectid");
        inputselect.val(value);
        $(divselectid + " ol").hide();

    });
};
$(function () {
    $.divselect("#select01", "#inputselect01");
    $.divselect("#select02", "#inputselect02");
});