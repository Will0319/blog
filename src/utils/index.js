// 时间转换方法
export function TimeUpdate(time){
    if (!time) return '';
    let date = new Date(time);
    let Mouth = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let Dates = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return date.getFullYear() + '-' + Mouth + '-' + Dates;
}

// 返回顶部H5方法
export function ScrollToAnchor(){
    let anchorElement = document.getElementById('to-header');
    // 如果对应id的锚点存在，就跳转到锚点
    if (anchorElement) { anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
}


// 封装时间类
export function TimesFun(timesData) {
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    let dateBegin = new Date(timesData.replace(/-/g, "/"));//将-转化为/，使用new Date
    let dateEnd = new Date();//获取当前时间
    let dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    let leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
    if(hours<10){
        hours = '0' + hours;
    }
    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
    if(minutes<10){
        minutes = '0' + minutes;
    }
    //计算相差秒数
    let leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    let timesString = '';

    timesString = dayDiff + '天' + hours + '小时' + minutes + '分钟' + seconds+'秒';

    return timesString
}