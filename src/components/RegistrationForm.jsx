import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function RegistrationForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle registration logic here
		const baseUrl = import.meta.env.VITE_API_URL;
		axios
			.post(`${baseUrl}/auth/register`, { email, password })
			.then(({ data }) => {
				console.log("Registration successful:", data);

				// Reset form fields
				setEmail("");
				setPassword("");
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
