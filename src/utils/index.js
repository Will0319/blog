export default {
    // 时间转换方法
    TimeUpdate(time){
        if (!time) return '';
        let date = new Date(time);
        let Mouth = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let Dates = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + Mouth + '-' + Dates;
    },
    // 返回顶部H5方法
    ScrollToAnchor(){
            let anchorElement = document.getElementById('to-header');
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) { anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
    }
}