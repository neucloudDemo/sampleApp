import Vue from 'vue';

Vue.filter('localDate', (date) => {
    date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    month = parseInt(month) < 10 ? '0' + month : month;
    day = parseInt(day) < 10 ? '0' + day : day;
    hour = parseInt(hour) < 10 ? '0' + hour : hour;
    minute = parseInt(minute) < 10 ? '0' + minute : minute;
    second = parseInt(second) < 10 ? '0' + second : second;

    date = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return date;
});