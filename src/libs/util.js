let util = {}
util.title = function (title) {
    title = title || '智能监控'
    window.document.title = title
}
// 简单对象的深拷贝
util.deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true
    } else {
        return false
    }
}
// 防抖
util.avoidShak = function (fn, time) {
    let timer
    return function (...arg) {
        clearTimeout(timer)
        // 获取执行环境上下文
        const context = this
        const _arguments = args
        timer = setTimeout(() => {
            fn.apply(context, _arguments)
        }, time)
    }
}
export default util