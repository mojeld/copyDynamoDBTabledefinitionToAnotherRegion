"use strict";
const TSysUtils = require('./SysUtils')

class TDynamoDBUtils extends TSysUtils {
    constructor(_regionName) {
        super()
        this.aWS = require('aws-sdk')
        this.aWS.config.update({region: _regionName})
        this.dynamoDB = new this.aWS.DynamoDB({apiVersion: '2012-08-10'})
    }

    /**
     * Get the Table list of DynamoDB.
     */
    async getListTables() {
        try {
            return await this.dynamoDB.listTables().promise()
        } catch (_e) {
            console.log(_e)
            return []
        }        
    }

    /**
     * Get the Table definition of DynamoDB.
     * @param {String} _tableName - Table Name
     */
    async getDescribeTable(_tableName) {
        try {
            return await this.dynamoDB.describeTable({TableName: _tableName}).promise()
        } catch(_e) {
            return null
        }
    }

    /**
     * Create a DynamoDB Table.
     * @param {*} _describes - table definition
     */
    async createTable(_describes) {
        try {
            return await this.dynamoDB.createTable(_describes).promise()
        } catch (_e) {
            console.log(_e)
            return null
        }
    }

    /**
     * Get all the definitions in the Table list.
     * @param {Array(String)} _tableNames 
     */
    async tableNamesToDescribe(_tableNames) {
        try {
            let res = {}
            if (this.keyExist('TableNames', _tableNames)) {
                console.log(_tableNames.TableNames)
                for (let idx in _tableNames.TableNames) {
                    let index = Number(idx)
                    let tableName = _tableNames.TableNames[index]
                    let describe = await this.getDescribeTable(tableName)
                    if (this.keyExist('Table', describe)) {
                        res[tableName] = describe.Table
                    }
                }
            }    
            return res
        } catch (_e) {
            return {}
        }
    }

    /**
     * The table list is created in order.
     * @param {Array[String]} _tableNames 
     * @param {*} _describes 
     */
    async createTables(_tableNames, _describes) {
        try{
            let res = []
            if (this.keyExist('TableNames', _tableNames)){
                for (let idx in _tableNames.TableNames) {
                    let index = Number(idx)
                    let desc = _describes[_tableNames.TableNames[index]]
                    desc = this.dynamoDBCreateTableDiscDelElements(desc)
                    console.log(desc)
                    let r1 = await this.createTable(desc)
                    res.push(r1)
                }    
            }
            return res
        } catch (_e) {
            console.log(_e)
            return null
        } 
    }

    dynamoDBCreateTableDiscDelElements(_desc) {
        let delKeys = ['TableStatus', 'TableSizeBytes','TableId','TableArn', 'ItemCount','CreationDateTime', 'NumberOfDecreasesToday']
        let delIgsKey = ['IndexStatus','IndexSizeBytes','ItemCount','IndexArn']
        try {
            let obj = this.deleteElements(delKeys, _desc)
            if (this.keyExist('ProvisionedThroughput', _desc)) {
                obj['ProvisionedThroughput'] = this.deleteElements(delKeys, _desc.ProvisionedThroughput)
            }
            if (this.keyExist('GlobalSecondaryIndexes', obj)) {
                let gsi_objs = []
                for (let idx in obj.GlobalSecondaryIndexes) {
                    let gsi = obj.GlobalSecondaryIndexes[idx]
                    gsi = this.deleteElements(delIgsKey, gsi)
                    if (this.keyExist('ProvisionedThroughput', gsi)) {
                        gsi['ProvisionedThroughput'] = this.deleteElements(delKeys, gsi.ProvisionedThroughput)
                    }
                    gsi_objs.push(gsi)                    
                }
                obj['GlobalSecondaryIndexes'] = gsi_objs
            }
            return obj
        } catch (_e1) {
            return _desc
        }
    }


}

module.exports = TDynamoDBUtils;