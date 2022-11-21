/**
 * 
 * @param {*} d 传入事件戳(UTC时间)
 * @returns 格式化后返回字符串
 */
export default function (d) {
    const weekArr = ['日', '一', '二', '三', '四', '五', '六']
    let str = '';
    let date = new Date(d + 8 * 60 * 60 * 1000).toJSON().replace("T", " ").slice(0, -5)
    let week = new Date(d + 8 * 60 * 60 * 1000).getDay();
    str = `${date} 星期${weekArr[week]}`;
    return str;
}