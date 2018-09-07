jQuery.divselect = function (divselectid, inputselectid) {
  const inputselect = $(inputselectid);
  $(`${divselectid} cite`).click(function () {
    $(this).parent()
      .toggleClass('on');
    const ol = $(`${divselectid} ol`);
    if (ol.css('display') == 'none') {
      ol.slideDown('fast');
    } else {
      ol.slideUp('fast');
    }
  });
  $(`${divselectid} ol li a`).click(function () {
    const txt = $(this).text();
    $(`${divselectid} cite`).html(txt);
    const value = $(this).attr('selectid');
    inputselect.val(value);
    $(`${divselectid} ol`).hide();

  });
};
$(() => {
  $.divselect('#select01', '#inputselect01');
  $.divselect('#select02', '#inputselect02');
});
