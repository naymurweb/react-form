import { useState } from "react";
import Container from "../components/share/Container";
import InputGroup from "../components/share/InputGroup";
import Button from "../components/ui/Button";
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
    const { name: key, value } = e.target;
    const oldState = JSON.parse(JSON.stringify(state));
    oldState[key].value = value;
    setState(oldState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = mapStateToValue(state);

    const { formError, isValid } = checkValidity(values);

    if (isValid) {
      console.log(state);
    } else {
      console.log(formError);
    }
  };

  const handleFocus = (e) => {
    const { name: key } = e.target;
    const oldState = JSON.parse(JSON.stringify(state));
    oldState[key].focus = true;
    setState(oldState);
  };

  const handleBlur = (e) => {
    const key = e.target.name;
    const oldState = JSON.parse(JSON.stringify(state));
    const values = mapStateToValue(state);
    const { formError } = checkValidity(values);
    if (oldState[key].focus && formError[key]) {
      oldState[key].error = formError[key];
    } else {
      oldState[key].error = "";
    }
    setState(oldState);
  };

  const checkValidity = (values) => {
    const formError = {};

    const { name, email, school } = values;
    if (!name) {
      formError.name = "Invalid name!";
    }
    if (!email) {
      formError.email = "Invalid email!";
    }
    if (!school) {
      formError.school = "Invalid school!";
    }
    return {
      isValid: Object.keys(formError).length === 0,
      formError,
    };
  };

  return (
    <div>
      <Container>
        <form action="" onSubmit={handleSubmit}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <InputGroup
              text="What is your name?"
              placeholder="please type your name"
              name="name"
              value={state.name.value}
              error={state.name.error}
              handleChange={handleChange}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
            ></InputGroup>
            <InputGroup
              text="What is your email?"
              placeholder="please type your email"
              name="email"
              value={state.email.value}
              error={state.email.error}
              handleChange={handleChange}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
            ></InputGroup>
            <InputGroup
              text="What is your school?"
              placeholder="please type your school"
              name="school"
              value={state.school.value}
              error={state.school.error}
              handleChange={handleChange}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
            ></InputGroup>

            <Button>Submit</Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default App;
