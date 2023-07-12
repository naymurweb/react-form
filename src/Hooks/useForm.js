import { useState } from "react";
import { deepClone, isObjEmpty } from "../utils/object-utils";

const useForm = ({ init, validate }) => {
  const [state, setState] = useState(mapValuesToState(init));

  const handleChange = (e) => {
    const { name, value } = e.target;

    const oldState = deepClone(state);
    oldState[name].value = value;

    const { errors } = getError();

    if (errors[name] && oldState[name].touch) {
      oldState[name].error = errors[name];
    } else {
      oldState[name].error = "";
    }

    setState(oldState);
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    const oldState = deepClone(state);

    oldState[name].focus = true;
    if (!oldState[name].touch) {
      oldState[name].touch = true;
    }

    setState(oldState);
  };

  const handleBlur = (e) => {
    const key = e.target.name;

    const oldState = deepClone(state);

    const { errors } = getError();

    if (oldState[key].touch && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = "";
    }
    oldState[key].focus = false;

    setState(oldState);
  };

  const handleSubmit = (e, cb) => {
    e.preventDefault();

    const { errors, hasError, values } = getError();
    cb({
      errors,
      hasError,
      values,
      touch: mapStateToKeys(state, "touch"),
      focus: mapStateToKeys(state, "focus"),
    });
  };

  const clear = () => {
    const newState = mapValuesToState(init, true);
    setState(newState);
  };

  const getError = () => {
    let hasError = null;
    let errors = null;

    const values = mapStateToKeys(state, "value");

    if (typeof validate === "boolean") {
      hasError = validate;
      errors = mapStateToKeys(state, "error");
    } else if (typeof validate === "function") {
      const errorsFormCB = validate(values);
      hasError = !isObjEmpty(errorsFormCB);
      errors = errorsFormCB;
    } else {
      throw new Error("validation property must be boolean and function");
    }

    return {
      values,
      hasError,
      errors,
    };
  };

  return {
    state,
    handleChange,
    handleFocus,
    handleBlur,
    clear,
    handleSubmit,
  };
};

export default useForm;

// helper functions

const mapValuesToState = (value) => {
  return Object.keys(value).reduce((acc, cur) => {
    acc[cur] = {
      value: value[cur],
      error: "",
      focus: false,
      touch: false,
    };
    return acc;
  }, {});
};

const mapStateToKeys = (state, key) => {
  return Object.keys(state).reduce((acc, cur) => {
    acc[cur] = state[cur][key];
    return acc;
  }, {});
};
