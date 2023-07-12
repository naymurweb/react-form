import { useState } from "react";
import Container from "../components/share/Container";
import InputGroup from "../components/share/InputGroup";
import Button from "../components/ui/Button";
import { deepClone } from "../utils/object-utils";

const init = {
  name: {
    value: "",
    error: "",
    focus: false,
  },
  email: {
    value: "",
    error: "",
    focus: false,
  },
  school: {
    value: "",
    error: "",
    focus: false,
  },
};
const App = () => {
  const [state, setState] = useState({ ...init });

  const mapStateToValue = (state) => {
    return Object.keys(state).reduce((acc, cur) => {
      acc[cur] = state[cur].value;
      return acc;
    }, {});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const oldState = deepClone(state);
    oldState[name].value = value;

    const values = mapStateToValue(state);
    const { fromError } = checkValid(values);

    if (fromError[name] && oldState[name].focus) {
      oldState[name].error = fromError[name];
    } else {
      oldState[name].error = "";
    }

    setState(oldState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = mapStateToValue(state);

    const { isValid, fromError } = checkValid(values);
    if (isValid) {
      console.log(state);
    } else {
        const oldState=deepClone(state)

      Object.keys(fromError).forEach((key)=>{
        oldState[key].error=fromError[key]
      })
      setState(oldState)
    }
  };

  const handleFocus = (e) => {
    const { name, value } = e.target;
    const oldState = deepClone(state);
    oldState[name].focus = true;
    setState(oldState);
  };
  const handleBlur = (e) => {
    const key = e.target.name;
    const oldState = deepClone(state);
    const values = mapStateToValue(state);

    const { fromError } = checkValid(values);

    if (oldState[key].focus && fromError[key]) {
      oldState[key].error = fromError[key];
    } else {
      oldState[key].error = "";
    }

    setState(oldState);
  };

  const checkValid = (values) => {
    const fromError = {};
    const { name, email, school } = values;
    if (!name) {
      fromError.name = "invalid name!";
    }

    if (!email) {
      fromError.email = "invalid Email!";
    }
    if (!school) {
      fromError.school = "invalid school!";
    }

    return {
      fromError,
      isValid: Object.keys(fromError).length == 0,
    };
  };

  return (
    <Container>
      <form action="" onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <InputGroup
            text="What is your name"
            placeholder="type"
            name="name"
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            error={state.name.error}
          ></InputGroup>
          <InputGroup
            text="What is your email"
            placeholder="type"
            name="email"
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            error={state.email.error}
          ></InputGroup>
          <InputGroup
            text="What is your school"
            placeholder="type"
            name="school"
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            error={state.school.error}
          ></InputGroup>
          <Button>submit</Button>
        </div>
      </form>
    </Container>
  );
};

export default App;
