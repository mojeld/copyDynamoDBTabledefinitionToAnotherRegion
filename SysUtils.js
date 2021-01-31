"use strict";

class TSysUtils {
    constructor() {
        console.log('SysUtils')
    }

    /**
     * Check if the key exists.
     * @param {String} keyName 
     * @param {*} obj 
     */
    keyExist(keyName, obj){
        let inKeyNames = Object.keys(obj)
        let bRes = false
        try {
            for ( let myKey in inKeyNames ) {
                if ( inKeyNames[myKey] === keyName )
                    bRes = true                     
            }
        } catch {
            console.log('The key name did not exist.')
        }
        return bRes
    }   
    
    /**
     * Delete unnecessary parts of JSON.
     * @param {*} _keys - List of unnecessary keys
     * @param {*} _obj - JSON
     */
    deleteElements(_keys, _obj){
        try {
            for (let idx in _keys) {
                if (this.keyExist(_keys[idx], _obj)) {
                    delete _obj[_keys[idx]]
                }
            }
            return _obj
        } catch (_e1) {
            console.log('Need not key could not be deleted.')
            return _obj
        }
    }
}

module.exports = TSysUtils;