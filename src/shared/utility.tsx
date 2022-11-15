import { InputRules } from '../containers/Checkout/ContactData/ContactData';

// Utility properties interface
interface Props {};

// Code
export const updateObject = (oldObject: Props, updatedProperties: Props) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value: string, rules: InputRules) => {
    let isValid = true;

    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    return isValid;
}
