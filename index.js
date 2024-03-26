import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient,PutCommand} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "test"

// exampletopic/test
// exampletopic/add

export const handler = async (event) => {
    // console.log(event)
    const date = new Date();
    let strData
    const ms = date.getTime();
    
    for (let key in event.records) {
        console.log(event)
        event.records[key].map((record) => {
            strData = Buffer.from(record.value, 'base64').toString()
        })
    }

    const setJson = JSON.parse(strData)
    console.log("setJson => ", setJson)
    try {
        await dynamo.send(
            new PutCommand({
                TableName: TABLE_NAME,
                Item: {
                    id: ms,
                    username: setJson.username,
                    age: setJson.age,
                },
            })
        );
        console.log("inserted!")
    } catch (err) {
        console.log("err catch insert item: ", err)
    }
};

// topic มีใน payload
