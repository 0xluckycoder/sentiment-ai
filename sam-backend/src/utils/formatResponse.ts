import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { constructedResponseType } from "../types/custom";

// format array of dynamodb type responses to common array of object responses
export const formatResponse = (data: Record<string, AttributeValue>[]) => {
    
    const formattedArray: Array<constructedResponseType> = data.map((Item) => {
        const itemKeys = Object.keys(Item);
        const constructedResponse: constructedResponseType = {};
        itemKeys.forEach((item) => {
            constructedResponse[item] = Object.values(Item[item])[0];
        });
        return constructedResponse;
    });
    return formattedArray;
};