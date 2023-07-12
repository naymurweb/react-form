import useForm from "../Hooks/useForm";
import InputGroup from "../components/share/InputGroup";
import Button from "../components/ui/Button";

const init = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "First name is require!";
  }
  if (!values.lastName) {
    errors.lastName = "Last name is require!";
  }
  if (!values.email) {
    errors.email = "email is require!";
  }
  if (!values.password) {
    errors.password = "password is require!";
  }

  return errors;
};

const cb = ({ values, hasError, errors }) => {
  if(hasError){
    alert('[error]'+JSON.stringify(errors))
  }
  else{
    alert(['success'+JSON.stringify(values)])
  }
};

const App = () => {
  const { state, handleChange, handleFocus, handleBlur, clear, handleSubmit } =
    useForm({ init, validate });

  return (
    <form onSubmit={(e)=>handleSubmit(e,cb)}>
      <div>
        <InputGroup
          placeholder="john"
          text="first name"
          handleChange={handleChange}
          name="firstName"
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          error={state.firstName.error}
        />
        <InputGroup
          placeholder="deo"
          text="last name"
          handleChange={handleChange}
          name="lastName"
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          error={state.lastName.error}
        />
        <InputGroup
          placeholder="sx@.com"
          text="first name"
          handleChange={handleChange}
          name="email"
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          error={state.email.error}
        />
        <InputGroup
          placeholder="****"
          text="password"
          handleChange={handleChange}
          name="password"
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          error={state.password.error}
        />
        <Button type="reset" onClick={clear}>
          Reset
        </Button>
        <br />
        <br />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default App;
