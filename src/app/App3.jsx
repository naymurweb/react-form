import InputGroup from "./../components/share/InputGroup";
import Button from "../components/ui/Button";
import Container from "../components/share/Container";
import { useState } from "react";
const init = {
  name: "",
  email: "",
  school: "",
};
const App = () => {
  const [values, setValues] = useState({ ...init });
  const [error, setError] = useState({ ...init });
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    school: false,
  });

  const handleChange = (e) => {
    setValues((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));

    const key = e.target.name;
    const {formError}=checkValidity(values)
    if(!formError){
        setError((pre)=>({
            ...pre,
            key:''
        }))

    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, formError } = checkValidity(values);
    if (isValid) {
      console.log(values);
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
    const { formError, isValid } = checkValidity(values);
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
      formError.name = "invalid name!";
    }
    if (!email) {
      formError.email = "invalid email!";
    }
    if (!school) {
      formError.school = "invalid school!";
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
              handleChange={handleChange}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
              error={error.name}
            ></InputGroup>
            <InputGroup
              text="What is your email?"
              placeholder="please type your email"
              name="email"
              handleChange={handleChange}
              handleFocus={handleFocus}
              error={error.email}
            ></InputGroup>
            <InputGroup
              text="What is your school?"
              placeholder="please type your school"
              name="school"
              handleChange={handleChange}
              handleFocus={handleFocus}
              error={error.school}
            ></InputGroup>
            <Button>Submit</Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default App;
