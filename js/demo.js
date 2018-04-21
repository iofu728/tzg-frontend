// 初始化所有内容
var initAll = function (data) {

    // 模拟下拉选择框
    $('.selector').each(function (i, el) {
        var clickStatus = false;
        $(this).click(function (e) {
            e.stopPropagation();
            if (clickStatus == false) {
                $(this).children('ul').slideDown(200);
                clickStatus = true;
            } else {
                $(this).children('ul').slideUp(200);
                clickStatus = false;
            }
        });
        $(this).attr({
            'd-value': $(this).find('.option_cur span').text()
        });
        $(this).find('.optionList li').each(function (i, el) {
            $(this).click(function () {
                $(this).parent().parent().attr({
                    'd-value': $(this).text()
                }).find('.option_cur span').text($(this).text());
            });
        });
    });

    // 加载分页器
    var pageNum = getTotalPageNum(data);
    var pageIndex = 0;
    var curPage = pageIndex + 1;
    loadPagination(pageNum, curPage);

    // 加载内容
    loadContent(data, pageNum, curPage);

    // 页码选择框
    $('.sel_pageList').change(function () {
        curPage = $('.sel_pageList').val();
        console.log(curPage);
        loadContent(data, pageNum, curPage);
        $("body,html").animate({scrollTop: 0}, 500);
    });

    // 首页
    $('.btn_start').click(function () {
        curPage = 1;
        loadPagination(pageNum, curPage);
        loadContent(data, pageNum, curPage);
        $("body,html").animate({scrollTop: 0}, 500);
    });

    // 尾页
    $('.btn_end').click(function () {
        curPage = pageNum;
        loadPagination(pageNum, curPage);
        loadContent(data, pageNum, curPage);
        $("body,html").animate({scrollTop: 0}, 500);
    });

    // 上一页
    $('.btn_prev').click(function () {
        if (curPage == 1) return;
        curPage--;
        loadPagination(pageNum, curPage);
        loadContent(data, pageNum, curPage);
        $("body,html").animate({scrollTop: 0}, 500);
    });

    // 下一页
    $('.btn_next').click(function () {
        if (curPage == pageNum) return;
        curPage++;
        loadPagination(pageNum, curPage);
        loadContent(data, pageNum, curPage);
        $("body,html").animate({scrollTop: 0}, 500);
    })
};


// 过滤信息
var filterInfo = function (data, time, sort, keywords) {
    var arr = [];
    var timeStr = (time == '选择时间' || time == '全部') ? '' : time;
    var sortStr = (sort == '选择类别' || sort == '全部') ? '' : time;
    var dealTime = '';
    var _timeStr = '';

    function makeStr(item) {
        var _str = '';
        for (var key in item) {
            _str += item[key];
        }
        ;
        return _str;
    }

    // 三项都不为空
    if (timeStr != '' && sortStr != '' && keywords != '') {
        for (var i = 0; i < data.length; i++) {
            dealTime = data[i].startDate.split(' ')[0];
            _timeStr = dealTime.split('-')[0] + '年' + dealTime.split('-')[1] + '月';
            if (_timeStr == timeStr && data[i].eventType == sort && makeStr(data[i]).indexOf(keywords) != -1) {
                arr.push(data[i]);
            }
        }
        return arr;
    }
    // 仅时间项为空
    else if (timeStr == '' && sortStr != '' && keywords != '') {
        for (var i = 0; i < data.length; i++) {
            if (data[i].eventType == sort && makeStr(data[i]).indexOf(keywords) != -1) {
                arr.push(data[i])
            }
        }
        return arr;
    }
    // 仅类别项为空
    else if (timeStr != '' && sortStr == '' && keywords != '') {
        for (var i = 0; i < data.length; i++) {
            dealTime = data[i].startDate.split(' ')[0];
            _timeStr = dealTime.split('-')[0] + '年' + dealTime.split('-')[1] + '月';
            if (_timeStr == timeStr && makeStr(data[i]).indexOf(keywords) != -1) {
                arr.push(data[i]);
            }
        }
        return arr;
    }
    // 仅关键字项为空
    else if (timeStr != '' && sortStr != '' && keywords == '') {
        for (var i = 0; i < data.length; i++) {
            dealTime = data[i].startDate.split(' ')[0];
            _timeStr = dealTime.split('-')[0] + '年' + dealTime.split('-')[1] + '月';
            if (_timeStr == timeStr && data[i].eventType == sort) {
                arr.push(data[i])
            }
        }
        return arr;
    }
    // 时间、类别为空
    else if (timeStr == '' && sortStr == '' && keywords != '') {
        for (var i = 0; i < data.length; i++) {
            if (makeStr(data[i]).indexOf(keywords) != -1) {
                arr.push(data[i]);
            }
        }
        return arr;
    }
    // 时间、关键字为空
    else if (timeStr == '' && sortStr != '' && keywords == '') {
        for (var i = 0; i < data.length; i++) {
            if (data[i].eventType == sort) {
                arr.push(data[i]);
            }
        }
        return arr;
    }
    // 类别、关键字为空
    else if (timeStr != '' && sortStr == '' && keywords == '') {
        for (var i = 0; i < data.length; i++) {
            dealTime = data[i].startDate.split(' ')[0];
            _timeStr = dealTime.split('-')[0] + '年' + dealTime.split('-')[1] + '月';
            if (_timeStr == timeStr) {
                arr.push(data[i])
            }
        }
        return arr;
    }
    // 三项全为空
    else if (timeStr == '' && sortStr == '' && keywords == '') {
        return data;
    }
    // 其他不确定情况
    else {
        return arr;
    }
};


// 加载时间列表
var loadTimeList = function (timeList) {
    $('.sel_time .optionList').empty();
    var li = document.createElement('li');
    li.setAttribute('class', 'optionItem');
    li.innerText = '全部';
    $('.sel_time .optionList').append(li);
    for (var i = 0; i < timeList.length; i++) {
        li = document.createElement('li');
        li.setAttribute('class', 'optionItem');
        li.innerText = timeList[i];
        $('.sel_time .optionList').append(li);
    }
};
var getTimeList = function (data) {
    var timeList = [],
        orgTime = '',
        dealTime = '',
        str = '';
    for (var i = 0; i < data.length; i++) {
        orgTime = data[i].startDate;
        dealTime = orgTime.split(' ')[0];
        str = dealTime.split('-')[0] + '年' + dealTime.split('-')[1] + '月';
        if (timeList.indexOf(str) == -1 && str != '') {
            timeList.push(str);
        } else {
            continue;
        }
    }
    return timeList;
};


// 加载类别列表
var loadSortList = function (sortList) {
    $('.sel_sort .optionList').empty();
    var li = document.createElement('li');
    li.setAttribute('class', 'optionItem');
    li.innerText = '全部';
    $('.sel_sort .optionList').append(li);
    for (var i = 0; i < sortList.length; i++) {
        li = document.createElement('li');
        li.setAttribute('class', 'optionItem');
        li.innerText = sortList[i];
        $('.sel_sort .optionList').append(li);
    }
};
var getSortList = function (data) {
    var sortList = [],
        str = '';
    for (var i = 0; i < data.length; i++) {
        str = data[i].eventType;
        if (str != '' && sortList.indexOf(str) == -1) {
            sortList.push(str);
        } else {
            continue;
        }
    }
    for (var i = 0; i < sortList.length; i++) {
        if (sortList[i] == '其他') {
            sortList.splice(i, 1);
            sortList.push('其他');
        }
    }
    return sortList;
};


// 获取总页数
var getTotalPageNum = function (data) {
    return Math.ceil(data.length / 10);
};
// 加载分页器
var loadPagination = function (pageNum, curPage) {
    var num = pageNum;
    if (num == 0) num = 1;
    $('.sel_pageList').empty();
    for (var i = 1; i <= num; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        $('.sel_pageList').append(option);
    }
    $('.sel_pageList').children().removeAttr('selected');
    $('.sel_pageList').children().eq(curPage - 1).attr('selected', 'selected');
}


// 加载内容
var loadContent = function (data, pageNum, curPage) {
    $('.contentList').empty();
    var contArr = [];
    for (var i = 0; i < pageNum; i++) {
        contArr.push([]);
    }
    // console.log(contArr);

    if (pageNum == 0) {
        var tip = document.createElement('dd');
        tip.className = 'promptTip';
        tip.innerText = '对不起，没有符合您要求的信息~~~';
        $('.contentList').append(tip);
    }
    else {
        for (var page = 0; page < pageNum; page++) {
            for (var i = 0; i < 10; i++) {
                // dd
                if ((page * 10 + i) == data.length) break;
                var contentItem = document.createElement('dd');
                contentItem.className = 'contentItem';
                // dd>a
                var a = document.createElement('a');
                var url = '../../xqxm/zl/article.html?';
                // var params = [];
                // for (var item in data[page*10+i]) {
                // params.push(item + '=' + data[page*10+i][item]);
                // }
                url += 'eventId=' + data[page * 10 + i].eventId;
                a.href = url;
                contentItem.appendChild(a);

                // ***** 时间标签 *****
                var itemDates = document.createElement('span');
                itemDates.className = 'item-dates';
                a.appendChild(itemDates);
                var italic = document.createElement('i');
                italic.innerText = data[page * 10 + i].startDate.split(' ')[0].split('-')[1] + '/' + data[page * 10 + i].startDate.split(' ')[0].split('-')[2];
                itemDates.appendChild(italic);
                var strong = document.createElement('strong');
                strong.innerText = data[page * 10 + i].startDate.split(' ')[0].split('-')[0];
                itemDates.appendChild(strong);

                // ***** 内容区域 *****
                var itemCon01 = document.createElement('div');
                itemCon01.className = 'item-con01';
                a.appendChild(itemCon01);

                // *****标题栏*****
                var h3 = document.createElement('h3');
                h3.innerText = data[page * 10 + i].eventName;
                itemCon01.appendChild(h3);

                // ***** 时间 *****
                var pTime = document.createElement('p');
                pTime.className = 'p_time';
                itemCon01.appendChild(pTime);
                var span = document.createElement('span');
                span.innerText = '时间';
                pTime.appendChild(span);
                var strong = document.createElement('strong');
                if (data[page * 10 + i].endDate != '') {
                    strong.innerText = data[page * 10 + i].startDate.split(' ')[0].split('-')[0] + '年'
                        + data[page * 10 + i].startDate.split(' ')[0].split('-')[1] + '月'
                        + data[page * 10 + i].startDate.split(' ')[0].split('-')[2] + '日'
                        + data[page * 10 + i].startDate.split(' ')[1] + ' —— '
                        + data[page * 10 + i].endDate.split(' ')[0].split('-')[0] + '年'
                        + data[page * 10 + i].endDate.split(' ')[0].split('-')[1] + '月'
                        + data[page * 10 + i].endDate.split(' ')[0].split('-')[2] + '日'
                        + data[page * 10 + i].endDate.split(' ')[1];
                } else {
                    strong.innerText = data[page * 10 + i].startDate.split(' ')[0].split('-')[0] + '年'
                        + data[page * 10 + i].startDate.split(' ')[0].split('-')[1] + '月'
                        + data[page * 10 + i].startDate.split(' ')[0].split('-')[2] + '日'
                        + data[page * 10 + i].startDate.split(' ')[1]
                }
                pTime.appendChild(strong);

                // ***** 地点 *****
                var pPlace = document.createElement('p');
                pPlace.className = 'p_place';
                itemCon01.appendChild(pPlace);
                var span = document.createElement('span');
                span.innerText = '地点';
                pPlace.appendChild(span);
                var strong = document.createElement('strong');
                if (data[page * 10 + i].eventLocNotes !== '') {
                    strong.innerText = data[page * 10 + i].eventLocNotes;
                } else {
                    strong.innerText = data[page * 10 + i].eventLocation;
                }
                pPlace.appendChild(strong);

                // ***** 主办单位 *****
                var pName = document.createElement('p');
                pName.className = 'p_name';
                itemCon01.appendChild(pName);
                var span = document.createElement('span');
                span.innerText = '主办';
                pName.appendChild(span);
                var strong = document.createElement('strong');
                strong.innerText = data[page * 10 + i].deptName;
                pName.appendChild(strong);

                // ***** 图片 *****
                var itemImg01 = document.createElement('div');
                itemImg01.className = 'item-img01';
                a.appendChild(itemImg01);
                var span = document.createElement('span');
                itemImg01.appendChild(span);
                var img = document.createElement('img');
                img.src = '../../images/events/' + data[page * 10 + i].eventId + '.jpg';
                span.appendChild(img);
                contArr[page].push(contentItem);
            }
        }
        // console.log(contArr);

        for (var i = 0; i < contArr[curPage - 1].length; i++) {
            $('.contentList').append(contArr[curPage - 1][i]);
        }
    }
}


$(document).ready(function () {
    // 获取原始数据
    $.ajax({
        type: "GET",
        url: '../../dat/events/allpubevents.json',
        dataType: "text",
        success: function (data) {
            var dataAll = [];
            var data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].startDate != "") {
                    dataAll.push(data[i]);
                }
            }

            console.log(dataAll);

            dataFiltered = (function (data) {
                var arr = [];
                for (var i = 0; i < data.length; i++) {
                    var startYear = data[i].startDate.substr(0, 4),
                        startMonth = data[i].startDate.substr(5, 2);
                    var date = new Date(),
                        curYear = date.getFullYear(),
                        curMonth = date.getMonth();
                    // console.log(startDate);
                    if (startYear >= curYear && startMonth > curMonth) {
                        arr.push(data[i]);
                    }
                }
                return arr;
            })(dataAll);
            console.log(dataFiltered);

            // 加载时间列表
            var timeList = getTimeList(dataAll);
            loadTimeList(timeList);

            // 加载类别列表
            var sortList = getSortList(dataAll);
            loadSortList(sortList);

            initAll(dataFiltered);

            // 点击搜索按钮
            $('.searchBtn').click(function () {
                var sel_time = $('.sel_time').attr('d-value');
                var sel_sort = $('.sel_sort').attr('d-value');
                var keywords = $('.searchInput input').val();
                var dataList = filterInfo(dataAll, sel_time, sel_sort, keywords);
                console.log(dataList);
                initAll(dataList);
            });
        }
    });

    // 全局点击事件
    $(document).click(function () {
        $('.selector ul').slideUp(200);
    });
})