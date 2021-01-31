# copyDynamoDBTabledefinitionToAnotherRegion
Copy the AWS DyanamoDB table definition to another region.

## Overview
This is a script program for copying the tables created in DynamoDB to another region. 
This program has been tested on [Node.js](https://nodejs.org/ja/) version 12. So node.js and npm need to be installed. We are not responsible for any problems that occur in this program. 

## Install 
1. Install [Node.js](https://nodejs.org/ja/) and npm.
2. Install [aws-sdk](https://aws.amazon.com/sdk-for-javascript/) with npm command.

``` 
npm install aws-sdk
```


## Execution method
Move to the folder with index.js and enter the following command.

``` sh
node index.js ap-northeast-1 us-west-2
```
In this example, a table is created in ``us-west-2`` from the table definition of ``ap-northeast-1``.  
An error will occur if a table with the same name exists in the copy destination.

# 
[MJELD TECHNOLOGIES](https://mjeld.com/)  
[Twitter @mqjeld](https://twitter.com/mqjeld)
