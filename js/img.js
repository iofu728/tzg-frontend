$.ajax({
  type: 'GET',
  // url: '/pub/120znxq/dat/events/allpubevents.json',
  dataType: 'text',
  success (text) {
    data = text;
    data = eval(`(${data})`);
    $('#img_list01').empty();
    let html = '';
    $('#img_list01').empty();
    for (let i = 0; i < data.length; i++) {
      // var startDate = date[i].startDate
      const startDates = data[i].startDate;
      const dates = new Date(startDates);
      const year = dates.getFullYear();
      const month = dates.getMonth() + 1;
      const date = dates.getDate();

      function Appendzero (obj) {
        if (obj < 10) {return `0${obj}`;} return obj;
      }

      const monthDate = `${Appendzero(month)}/${Appendzero(date)}`;
      html += `<dd class='item-info01'><a href='/pub/120znxq/xqxm/zl/article.html'><span class='item-dates'><i>${monthDate}</i><strong>${year}</strong></span><div class='item-con01'><h3>${data[i].eventName}</h3><p class='p_time'><span>时间</span><strong>${data[i].startDate}-${data[i].endDate}</strong></p><p class='p_place'><span>地点</span><strong>${data[i].eventLocation}</strong></p><p class='p_name'><span>主办</span><strong>${data[i].deptName}</strong></p></div><div class='item-img01'><span><img src='/pub/120znxq/images/events/${data[i].eventId}.jpg'/></span></div></a></dd>`;
    }
    $('#img_list01').append(html);


  },
});
