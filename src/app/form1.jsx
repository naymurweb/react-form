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
  const [values, setValues] = useState({ ...init });
  const [errors, setErrors] = useState({ ...init });
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    school: false,
  });

  const handleChange = (e) => {
    const key = e.target.name;
    setValues((pre) => ({
      ...pre,
      [key]: e.target.value,
    }));
    const { fromError } = checkValid(values);

    if (!fromError[key]) {
      setErrors((pre) => ({
        ...pre,
        [key]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, fromError } = checkValid(values);
    if (isValid) {
      console.log(values);

      setErrors({ ...fromError });
    } else {
      setErrors({
        ...fromError,
      });
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
    const { fromError } = checkValid(values);

    if (fromError[key] && focus[key]) {
      setErrors((pre) => ({
        ...pre,
        [key]: fromError[key],
      }));
    } else {
      setErrors((pre) => ({
        ...pre,
        [key]: "",
      }));
    }
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
         <div style={{display:'flex', flexDirection:'column',gap:'20px'}}>
         <InputGroup
            text="What is your name"
            placeholder="type"
            name="name"
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            error={errors.name}
          ></InputGroup>
          <InputGroup
            text="What is your email"
            placeholder="type"
            name="email"
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            error={errors.email}
          ></InputGroup>
          <InputGroup
            text="What is your school"
            placeholder="type"
            name="school"
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            error={errors.school}
          ></InputGroup>
          <Button>submit</Button>
         </div>
        </form>
      </Container>
  );
};

export default App;
