import { MongoServerError } from 'mongodb';

class MongoValidation {
    public static getMessages(error: MongoServerError): string[] {
        const messages: string[] = [];

        if (error.errorResponse.errInfo?.details.schemaRulesNotSatisfied) {
            error.errorResponse.errInfo?.details.schemaRulesNotSatisfied.map((rule: any) => {
                if (rule.operatorName === 'required') {
                    const missing = rule.missingProperties.map((property: string) => property).join(', ');
                    messages.push(`Missing required field: ${missing}`);
                } else if (rule.operatorName === 'properties') {
                    rule.propertiesNotSatisfied.map((property: any) => {
                        messages.push(property.description);
                    });
                } else {
                    messages.push(`Validation failed for rule "${rule.operatorName}"`);
                }
            });
        }

        return messages;
    }
}

export default MongoValidation;