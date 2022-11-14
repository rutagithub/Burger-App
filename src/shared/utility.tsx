// Utility properties interface
interface Props {};

// Code
export const updateObject = (oldObject: Props, updatedProperties: Props) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};