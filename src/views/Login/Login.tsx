import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./Login.css";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import AppleIcon from "../../assets/images/Apple_icon.png";
import FacebookIcon from "../../assets/images/Facebook_icon.png";
import InstagramIcon from "../../assets/images/Instagram_icon.png";
import { useAuth } from "../../context/useAuth";

type LoginFormsInputs = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.email, form.password);
  };
  return (
    <div className="card-container">
      <div className="title">
        <h3>Account Login</h3>
        <h3>Hey, Enter your details to get sign in to your account</h3>
      </div>
      <form onSubmit={handleSubmit(handleLogin)} className="form-container">
        <div className="form-controller">
          <TextField
            type="text"
            id="email"
            placeholder="Enter Email "
            {...register("email")}
          />
          {errors.email ? <p>{errors.email.message}</p> : ""}
        </div>
        <div className="form-controller">
          <TextField
            type="password"
            id="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password ? <p>{errors.password.message}</p> : ""}
        </div>
        <div style={{ alignSelf: "flex-start" }}>
          <a href="#">Having trouble in sign in ?</a>
        </div>
        <div className="form-controller">
          <Button type="submit" label="Sign in" className="login-button" />
        </div>
      </form>
      <div className="icon-buttons">
        <button className="icon-button">
          <img src={AppleIcon} alt="Apple Image" />
          Apple
        </button>
        <button className="icon-button">
          <img src={FacebookIcon} alt="Facebook Image" />
          Facebook
        </button>
        <button className="icon-button">
          <img src={InstagramIcon} alt="Instagram Image" />
          Instagram
        </button>
      </div>
      <div>
        <p>
          Don’t have an account? <a href="/register">Request Now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;