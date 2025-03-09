/**
 * 检查给定的对象是否是指定构造函数的实例。
 *
 * @param {any} obj - 要检查的对象。可以是任何类型。
 * @param {Function} classFunction - 用来检查对象是否为其构造函数的类或函数。
 * 
 * @returns {boolean} 如果对象是提供的构造函数的实例，则返回true；否则返回false。
 * 
 * @throws {TypeError} 如果classFunction不是一个函数，则返回false而不是抛出错误。
 */
const checkIfInstanceOf = function (obj: any, classFunction: any) {
    if (obj === null || obj === undefined || !(classFunction instanceof Function))
        return false;
    return Object(obj) instanceof classFunction;
}

export {
    checkIfInstanceOf,
}