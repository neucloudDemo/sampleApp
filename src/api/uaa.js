export function appInit(resolve, reject) {
    // 保存token信息
    if (location.hash.indexOf('access_token') > 0) {
        let loginInfo = {}
        location.hash
            .slice(1)
            .split('&')
            .map(item => item.split('='))
            .forEach(arr => loginInfo[arr[0]] = arr[1])
        if (loginInfo.access_token) {
            localStorage.setItem('token', loginInfo.access_token)
        }
        if (loginInfo.state && loginInfo.state != location.href) {
            location.href = decodeURIComponent(loginInfo.state);
        }
    }
    resolve()
}