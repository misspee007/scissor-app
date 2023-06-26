import { Link } from "react-router-dom";
import { RegistrationForm } from "../components";

function RegistrationPage() {
	return (
		<div>
			<h1>Register</h1>
      <p>Already have an account? <Link to={"/login"}>login</Link>.</p>
			<RegistrationForm />
		</div>
	);
}

export default RegistrationPage;
