export function isType(arg: any, type: string): boolean {
    return Object.prototype.toString.call(arg) === '[object ' + type + ']'
}

export function isString(arg: any): boolean {
    return isType(arg, 'String');
}