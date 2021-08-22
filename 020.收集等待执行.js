/***
 * 描述：在一定时间内，收集操作，时间到了一起执行
 */
function main20() {
    var COLLECT_DELAY = 2000;
    var collectManaget = {
        cache: [],
        timer: null,
        add: function (callback) {
            var that = this;
            that.cache.push(callback);
            return that;
        },
        collectWaitExecute: function () {
            var that = this;
            if (that.timer)
                return;
            that.timer = setTimeout(function () {
                that._execute();
                // 重置
                that.timer = null;
                that.cache.length = 0;
            }, COLLECT_DELAY);
        },
        _execute: function () {
            var that = this;
            var cache = that.cache;
            if (!cache || cache.length === 0)
                return;
            var len = cache.length;
            for (var i = 0; i < len; ++i)
                cache[i]();
        }
    };
    setInterval(function () {
        collectManaget.add(function () {
            console.log('[执行我]:');
        });
        collectManaget.collectWaitExecute(); // 收集后执行
    }, 300);
}
main20();
