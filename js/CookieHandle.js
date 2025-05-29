/**
 * cookieHandle: 常用cookie操作方法的封装
 **/
var cookieHandle = {
    /**
     * 获取cookie中指定名称对应的值
     * @param {string} name - 要获取的cookie的名称
     * @returns {string} - 返回cookie的值，如果未找到则返回空字符串
     */
    getCookie: function (name) {
        // 检查输入的name是否为字符串
        if (typeof name !== 'string') {
            console.error('getCookie方法的参数name必须是字符串类型');
            return "";
        }
        // 将cookie字符串按"; "分割成数组
        const cookieList = document.cookie.split("; ");
        for (let i = 0; i < cookieList.length; i++) {
            // 将每个cookie项按"="分割成键值对数组
            const [cookieName, cookieValue] = cookieList[i].split("=");
            if (cookieName === encodeURIComponent(name)) {
                // 如果找到匹配的cookie名称，返回解码后的值
                return decodeURIComponent(cookieValue);
            }
        }
        return "";
    },
    /**
     * 设置cookie
     * @param {Object} option - 设置cookie的选项
     * @param {string} option.name - 要设置的cookie的名称，必选
     * @param {string} option.value - 要设置的cookie的值，必选
     * @param {number} [option.expiresHours] - 过期时间（小时），可选，默认为浏览器关闭即消失
     * @param {string} [option.path] - cookie存放路径，可选
     * @param {string} [option.domain] - 可访问该cookie的域名，可选
     */
    setCookie: function (option) {
        // 检查必要参数是否存在且为字符串类型
        if (!option || typeof option.name!== 'string' || typeof option.value!== 'string') {
            console.error('setCookie方法的参数option必须包含name和value，且均为字符串类型');
            return;
        }
        // 构建cookie字符串
        let cookieString = `${encodeURIComponent(option.name)}=${encodeURIComponent(option.value)}`;
        if (option.expiresHours) {
            // 检查expiresHours是否为有效的数字
            if (typeof option.expiresHours!== 'number') {
                console.error('setCookie方法的参数option.expiresHours必须是数字类型');
                return;
            }
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + option.expiresHours * 3600 * 1000);
            cookieString += `; expires=${expirationDate.toUTCString()}`;
        }
        if (option.path) {
            // 检查path是否为字符串类型
            if (typeof option.path!== 'string') {
                console.error('setCookie方法的参数option.path必须是字符串类型');
                return;
            }
            cookieString += `; path=${option.path}`;
        }
        if (option.domain) {
            // 检查domain是否为字符串类型
            if (typeof option.domain!== 'string') {
                console.error('setCookie方法的参数option.domain必须是字符串类型');
                return;
            }
            cookieString += `; domain=${option.domain}`;
        }
        // 设置cookie
        document.cookie = cookieString;
    },
    /**
     * 删除cookie
     * @param {string} name - 要删除的cookie的名称，必选
     * @param {Object} [option] - 删除cookie的选项
     * @param {string} [option.path] - cookie存放路径，可选
     * @param {string} [option.domain] - 可访问该cookie的域名，可选
     */
    deleteCookie: function (name, option = {}) {
        // 检查输入的name是否为字符串
        if (typeof name!== 'string') {
            console.error('deleteCookie方法的参数name必须是字符串类型');
            return;
        }
        const expirationDate = new Date(0);
        let cookieString = `${encodeURIComponent(name)}=; expires=${expirationDate.toUTCString()}`;
        if (option.path) {
            // 检查path是否为字符串类型
            if (typeof option.path!== 'string') {
                console.error('deleteCookie方法的参数option.path必须是字符串类型');
                return;
            }
            cookieString += `; path=${option.path}`;
        }
        if (option.domain) {
            // 检查domain是否为字符串类型
            if (typeof option.domain!== 'string') {
                console.error('deleteCookie方法的参数option.domain必须是字符串类型');
                return;
            }
            cookieString += `; domain=${option.domain}`;
        }
        // 删除cookie
        document.cookie = cookieString;
    }
};