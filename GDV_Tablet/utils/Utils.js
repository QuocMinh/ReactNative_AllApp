class Utils  {
    constructor() {
        console.log('=============');
        console.log('Utils created');
        console.log('=============');
    }
    log = (name, message) => {
        var fn = name + '()';
        this.logDivChar(fn)
        console.log(fn);
        this.logDivChar(fn)
        console.log(message);
    }
    logDivChar = (name) => {
        console.log(name.replace(/./g, '='));
    }
};

var Params = {
    URL: "https:// ...."
};

module.exports = {
    Utils   : new Utils(),
    Params  : Params
};