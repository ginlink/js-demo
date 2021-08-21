function main() {
    var nomalEvent = {
        queue: {},
        listen: function (eventName, callback) {
            var that = this;
            // 不知道还有没有更好的写法，这里this没有ts提示，只有手动从any收缩它的类型
            if (!that.queue[eventName])
                that.queue[eventName] = [];
            that.queue[eventName].unshift(callback);
        },
        trigger: function (eventName) {
            var argvs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                argvs[_i - 1] = arguments[_i];
            }
            var that = this;
            var container = that.queue[eventName];
            if (!container)
                return false;
            var len = container.length;
            for (var i = len - 1; i >= 0; --i)
                container[i].apply(container, argvs);
            return true;
        },
        remove: function (eventName, callback) {
            var that = this;
            var container = that.queue[eventName];
            if (!container)
                return false;
            var len = container.length;
            for (var i = len; i >= 0; --i) { // 队列约定，从后向前遍历
                if (container[i] === callback) {
                    container.splice(i, 1); // 删除这个订阅
                    return true;
                }
            }
            return false;
        }
    };
    function installEvent(target) {
        var res = {};
        for (var key in nomalEvent) {
            res[key] = nomalEvent[key];
        }
        for (var key in target) {
            res[key] = target[key];
        }
        // 必须主动断言类型，ts无法推断手动赋值的对象
        return res;
    }
    var origin = { aaa: 1, bbb: 2 };
    var eventedOrigin = installEvent(origin);
    eventedOrigin.listen('sale', function (price) {
        console.log('[sale事件执行了]:', price);
    });
    var unsaleHandler = function (price) {
        console.log('[unsale事件执行了]:', price);
    };
    eventedOrigin.listen('unsale', unsaleHandler);
    eventedOrigin.trigger('sale');
    eventedOrigin.trigger('unsale', 100000);
    eventedOrigin.remove('unsale', unsaleHandler); // 取消订阅
    eventedOrigin.trigger('unsale', 100000);
}
main();
