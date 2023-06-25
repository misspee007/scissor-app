import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import config from "../config";

function LoginForm() {
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
		const { baseUrl } = config.Api;
		axios
			.post(`${baseUrl}/auth/login`, { email, password })
			.then(({ data }) => {
				// Reset form fields
				setEmail("");
				setPassword("");

        // store token in cookie
        document.cookie = `access_token=${data.access_token}`;

        // redirect to home page
        navigate("/");
			})
			.catch((err) => {
				console.log('error logging in: ', err);
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
				Sign In
			</Button>
		</Form>
	);
}

export default LoginForm;
