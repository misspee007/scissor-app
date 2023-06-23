import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import config from "../config";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

  const navigate = useNavigate();

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle registration logic here
		const { baseUrl } = config.Api;

		axios
			.post(`${baseUrl}/auth/register`, { email, password })
			.then(({ data }) => {
				console.log("Registration successful:", data);

				// Reset form fields
				setEmail("");
				setPassword("");

        // TODO: Store token in local storage
        // redirect to home page
        navigate("/");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					value={email}
					onChange={handleEmailChange}
				/>
			</Form.Group>
			<Form.Group controlId="formPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					value={password}
					onChange={handlePasswordChange}
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Register
			</Button>
		</Form>
	);
}

export default RegistrationForm;
