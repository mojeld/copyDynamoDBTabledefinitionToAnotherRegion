const TDynamoDBUtils = require('./DynamoDBUtils')
const main = async (_argv) => {
    let listTable = []
    let descs = {}
    for (let idx in _argv) {
        try {
            let dynamoDBClient = {}            
            let idx_num = Number(idx)
            switch (idx_num) {
            case 2: //Get the table list from the copy.
                dynamoDBClient = new TDynamoDBUtils(_argv[idx_num])
                listTable = await dynamoDBClient.getListTables()
                descs = await dynamoDBClient.tableNamesToDescribe(listTable)
                break
            case 3: //Copy destination region.
                dynamoDBClient = new TDynamoDBUtils(_argv[idx])
                let results = dynamoDBClient.createTables(listTable, descs)
                for (let aResult in results){
                    console.log(aResult)
                }
                break
            }
        } catch (_e1) {
            console.log(_e1)
        }
    }
}
//['ap-northeast-1','us-west-2']
let aTest = main(process.argv)
Promise.all([aTest]).then((athreadList) => {
    athreadList.forEach(aVal => {
        console.log(aVal)
    })
})
