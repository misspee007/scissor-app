import { LoginForm } from "../components";
import { Link } from "react-router-dom";

function LoginPage() {
	return (
		<div>
			<h1>Login</h1>
      <p>If you do not have an existing account, <Link to={"/register"}>create an account</Link>.</p>
			<LoginForm />
		</div>
	);
}

export default LoginPage;
