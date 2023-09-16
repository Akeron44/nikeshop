import { useReducer } from "react"
const defaultValue = {
    inputValue: "",
    isTouched: false
};

const inputReducer = (state, action) => {
    if (action.type === "USER") {
        return { inputValue: action.value, isTouched: state.isTouched }
    }
    if (action.type === "BLUR") {
        return { inputValue: state.inputValue, isTouched: action.isTouched }
    }

    return defaultValue
}

const UseInput = validateValue => {
    const [input, dispatchInput] = useReducer(inputReducer, defaultValue);

    const inputIsValid = validateValue(input.inputValue);
    const inputHasError = !inputIsValid && input.isTouched;

    function onChangeInputHandler(event) {
        dispatchInput({ type: "USER", value: event.target.value })
    };

    function onBlurInputHandler() {
        dispatchInput({ type: "BLUR", isTouched: true });
    }

    return {
        value: input.inputValue,
        onChange: onChangeInputHandler,
        onBlur: onBlurInputHandler,
        inputIsValid,
        inputHasError
    }
};

export default UseInput;