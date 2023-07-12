import { useState } from "react";
import Container from "../components/share/Container";
import InputGroup from "../components/share/InputGroup";
import Button from "../components/ui/Button";

const init = {
  name: "",
  email: "",
  school: "",
};
const App = () => {
  const [formValue, setFormValue] = useState({ ...init });
  const [error, setError] = useState({ ...init });
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    school: false,
  });

  const handleChange = (e) => {
    setFormValue((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
    const key = e.target.name;
    const { formError } = checkValidity(formValue);
    if (!formError[key]) {
      setError((pre) => ({
        ...pre,
        [key]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, formError } = checkValidity(formValue);
    if (isValid) {
      console.log(formValue);
      setError({ ...formError });
    } else {
      setError({ ...formError });
    }
  };

  const handleFocus = (e) => {
    setFocus((pre) => ({
      ...pre,
      [e.target.name]: true,
    }));
  };

  const handleBlur = (e) => {
    const key = e.target.name;
    const { formError } = checkValidity(formValue);

    if (formError[key] && focus[key]) {
      setError((pre) => ({
        ...pre,
        [key]: formError[key],
      }));
    } else {
      setError((pre) => ({
        ...pre,
        [key]: "",
      }));
    }
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
    <Container>
      <form action="" onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <InputGroup
            text="This is name?"
            placeholder="type your name"
            name="name"
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            error={error.name}
          ></InputGroup>

          <InputGroup
            text="This is school?"
            placeholder="type your school name"
            name="school"
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            error={error.school}
          ></InputGroup>
          <InputGroup
            text="This is email?"
            placeholder="type your email"
            name={"email"}
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            error={error.email}
          ></InputGroup>

          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Container>
  );
};

export default App;
