/**
 * 向腾讯发送请求，获取实时数据
 */
var data;

function getData() {
    $.ajax({
        url: 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5',
        dataType: 'jsonp',
        success: function (result) {
            data = JSON.parse(result.data);
            left1();
            left2();
            right1();
            right2();
        }
    });
}
getData();

function left1() {
    document.getElementById('confirm').innerText = data.chinaTotal.confirm;
    document.getElementById('heal').innerText = data.chinaTotal.heal;
    document.getElementById('dead').innerText = data.chinaTotal.dead;
    document.getElementById('nowConfirm').innerText = data.chinaTotal.nowConfirm;
    document.getElementById('noInfect').innerText = data.chinaTotal.noInfect;
    document.getElementById('import').innerText = data.chinaTotal.importedCase;
}

function left2() {
    var left2Chart = echarts.init(document.getElementById('left2'), 'dark');

    var option = {
        title: {
            text: '',
        },
        tooltip: {
            trigger: 'item'
        },
        visualMap: { // 左侧小导航图标
            show: true,
            x: 'left',
            y: 'bottom',
            textStyle: {
                fontSize: 8,
            },
            splitList: [{
                    start: 1,
                    end: 9
                },
                {
                    start: 10,
                    end: 99
                },
                {
                    start: 100,
                    end: 999
                },
                {
                    start: 1000,
                    end: 9999
                },
                {
                    start: 10000
                }
            ],
            color: ['#8A3310', '#C64918', '#E55B25', '#F2AD92', '#F9DCD1']
        },
        series: [{
            name: '累计确诊人数',
            type: 'map',
            mapType: 'china',
            roam: false, // 禁用拖动和缩放
            itemStyle: { // 图形样式
                normal: {
                    borderWidth: .5, //区域边框宽度
                    borderColor: '#009fe8', //区域边框颜色
                    areaColor: '#ffefd5', //区域颜色
                },
                emphasis: { // 鼠标滑过地图高亮的相关设置
                    borderWidth: .5,
                    borderColor: '#4b0082',
                    areaColor: '#fff',
                }
            },
            label: { // 图形上的文本标签
                normal: {
                    show: true, //省份名称
                    fontSize: 8,
                },
                emphasis: {
                    show: true,
                    fontSize: 8,
                }
            },
            data: [] // [{'name': '上海', 'value': 318}, {'name': '云南', 'value': 162}]
        }]
    };

    var provinces = data.areaTree[0].children;
    for (var province of provinces) {
        option.series[0].data.push({
            'name': province.name,
            'value': province.total.confirm
        });
    }

    left2Chart.setOption(option);
}

function right1() {
    var right1Chart = echarts.init(document.getElementById('right1'), 'dark');

    var option = {
        title: {
            text: '全国确诊省市TOP10',
            textStyle: {
                color: 'white',
            },
            left: 'left'
        },
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            //指示器
            axisPointer: {
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: [] // ['湖北','广州','北京']
        },
        yAxis: {
            type: 'value',
            //y轴字体设置
            axisLabel: {
                show: true,
                color: 'white',
                fontSize: 12,
                formatter: function (value) {
                    if (value >= 1000) {
                        value = value / 1000 + 'k';
                    }
                    return value;
                }
            },
        },
        series: [{
            data: [], // [582, 300, 100]
            type: 'bar',
            barMaxWidth: '50%'
        }]
    };

    var provinces = data.areaTree[0].children;
    var topData = [];
    for (var province of provinces) {
        topData.push({
            'name': province.name,
            'value': province.total.confirm
        });
    }

    // 降序排列
    topData.sort(function (a, b) {
        return b.value - a.value;
    });
    // 只保留前10条
    topData.length = 10;
    // 分别取出省份名称和数据
    for (var province of topData) {
        option.xAxis.data.push(province.name);
        option.series[0].data.push(province.value);
    }

    right1Chart.setOption(option);
}

function right2() {
    var right2Chart = echarts.init(document.getElementById('right2'), 'dark');

    var option = {
        title: {
            text: '境外输入省市TOP5',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: [] // ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [{
            name: '省市名称',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            // data: [
            //     {value: 335, name: '直接访问'},
            //     {value: 310, name: '邮件营销'},
            //     {value: 234, name: '联盟广告'},
            //     {value: 135, name: '视频广告'},
            //     {value: 1548, name: '搜索引擎'}
            // ],
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    var provinces = data.areaTree[0].children;
    var topData = [];
    for (var province of provinces) {
        if (province.children[0].name == '境外输入') {
            topData.push({
                'name': province.name,
                'value': province.children[0].total.confirm
            });
        }
    }
    // 降序排列
    topData.sort(function (a, b) {
        return b.value - a.value;
    });
    // 只保留前5条
    topData.length = 5;
    // 分别取出省份名称和数据
    for (var province of topData) {
        option.legend.data.push(province.name);
        option.series[0].data.push(province);
    }

    right2Chart.setOption(option);
}

// 每5分钟自动获取数据
setInterval(getData, 5 * 60 * 1000);



/**
 * 实时显示时间
 */
function showTime() {
    //获取年月日时分秒
    var time = new Date();
    var year = time.getFullYear();
    var month = check(time.getMonth()); // 检查是否需要补0
    var day = check(time.getDate());
    var hour = check(time.getHours());
    var minute = check(time.getMinutes());
    var second = check(time.getSeconds());

    var content = year + '年' + month + '月' + day + '日  ' + hour + ':' + minute + ':' + second;
    if ($('#title span').length == 0) {
        $('#title').append($('<span>').text(content).css({
            position: 'absolute',
            left: '20px',
            fontSize: '20px'
        }));
    } else {
        $('#title span').text(content);
    }
}
showTime();

// 检查数字，如果是个位数，则补0
function check(num) {
    return num < 10 ? '0' + num : num;
}

// 每1秒刷新时间
setInterval(showTime, 1000);