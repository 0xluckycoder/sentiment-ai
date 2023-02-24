import { ExpressionObject } from "../types/custom";

// build dynamodb expressions based on request object
export const expressionBuilder = (expressionObject: ExpressionObject): string => {
    let expression = "SET ";
    const requestObjectKeys = Object.keys(expressionObject);
    requestObjectKeys.forEach((item, index) => {
      expression += `${item} = :${item}`;
      if (index === requestObjectKeys.length - 1) return;
      expression += ", ";
    });
    return expression;
};