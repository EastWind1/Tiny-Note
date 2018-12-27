export function Log(target, name, descriptor) {
    const method = descriptor.value;
    descriptor.value = function(...args) {
        const result = method.apply(this, args);
        let outResult = result;
        if ( typeof result === 'undefined') {
            outResult = 'void';
        }
        console.log(`${new Date()} - [${target.constructor.name}]: ${name} => ${outResult}`);
        return result;
    };
}
