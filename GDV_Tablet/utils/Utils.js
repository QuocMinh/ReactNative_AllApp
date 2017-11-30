import { Dimensions } from "react-native";


const { width, height, fontScale } = Dimensions.get('window');

class Utils  {
    
    constructor() {
        console.log('=============');
        console.log('Utils created');
        console.log('=============');
    }
    
    log = (name, message) => {
        var fn = name + '()';

        this.logDivChar(fn);    // print ===========
        console.log(fn);        // print name()
        this.logDivChar(fn);    // print ===========
        console.log(message);   // print value
    }

    logDivChar = (name) => {
        console.log(name.replace(/./g, '='));
    }

    respXml2Json(xmlStr = '') {
        let first = xmlStr.indexOf('{'); // Lay ra vi tri bat dau cua chuoi Json
        let last  = xmlStr.indexOf('}'); // Lay ra vi tri ket thuc cua chuoi Json

        var jsonStr  = xmlStr.substring(first, last + 1);
        var jsonData = JSON.parse(jsonStr);

        return jsonData;
    }
};

var Params = {
    URL                 : "https:// ....",
    PRIMARY_COLOR       : '#303F9F',
    SECONDARY_COLOR     : '#3F51B5',
    SCREEN_WIDTH        : width,
    SCREEN_HEGHT        : height,
    SCREEN_FONTSCALSE   : fontScale,
    IMEI                : '355755087434999',
};

module.exports = { Utils: new Utils(), Params: Params };