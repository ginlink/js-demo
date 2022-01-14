/**
 * 代理模式适用于对原对象扩展功能的场景
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function main17() {
    var dog = { name: '小花' };
    var cat = { name: '小花花时间东风科技' };
    var speakProxy = function (target) {
        return __assign(__assign({}, target), { speak: function () {
                var that = this;
                console.log('[我会说话了！]:', that.name);
            } });
    };
    var proxyDog = speakProxy(dog);
    var proxyCat = speakProxy(cat);
    proxyDog.speak();
    proxyCat.speak();
}
main17();
