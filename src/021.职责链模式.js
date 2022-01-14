/***
 * 职责链模式：我不知道谁知道答案，我希望我的请求
 * 在每一个人都走一遍，直到有人能够告诉我答案
 */
function main21() {
    // 注意不要用箭头函数，否则this指向全局，很奇怪而不是指向undefined
    Function.prototype.after = function (fn) {
        var that = this;
        return function (type, pay, leftNum) {
            var ret = that(type, pay, leftNum);
            console.log('[that]:', that, ret);
            console.log('[执行了]:');
            if (ret === 'nextSuccessor') {
                return fn.call(that, type, pay, leftNum);
            }
            return ret;
        };
    };
    var order500 = function (type, pay, leftNum) {
        console.log('[order500]:');
        if (type === 500) {
            console.log("500\u5143\u7EA7\u522B\uFF0C\u7C7B\u522B" + type + "\uFF0C \u662F\u5426\u652F\u4ED8" + pay + "\uFF0C \u5269\u4F59\u6570\u91CF" + leftNum);
            return false;
        }
        return 'nextSuccessor';
    };
    var order300 = function (type, pay, leftNum) {
        console.log('[order300]:');
        if (type === 300) {
            console.log("300\u5143\u7EA7\u522B\uFF0C\u7C7B\u522B" + type + "\uFF0C \u662F\u5426\u652F\u4ED8" + pay + "\uFF0C \u5269\u4F59\u6570\u91CF" + leftNum);
            return false;
        }
        return 'nextSuccessor';
    };
    var order200 = function (type, pay, leftNum) {
        console.log('[order200]:');
        if (type === 200) {
            console.log("200\u5143\u7EA7\u522B\uFF0C\u7C7B\u522B" + type + "\uFF0C \u662F\u5426\u652F\u4ED8" + pay + "\uFF0C \u5269\u4F59\u6570\u91CF" + leftNum);
            return false;
        }
        return 'nextSuccessor';
    };
    var orderNormal = function (type, pay, leftNum) {
        console.log('[orderNormal]:');
        if (type === 0) {
            console.log("\u666E\u901A\u7EA7\u522B\uFF0C\u7C7B\u522B" + type + "\uFF0C \u662F\u5426\u652F\u4ED8" + pay + "\uFF0C \u5269\u4F59\u6570\u91CF" + leftNum);
            return false;
        }
        return 'nextSuccessor';
    };
    // const order = order500.after(order300).after(order200).after(orderNormal)
    var order = order500.after(order300).after(order200);
    order(500, true, 1);
}
main21();
