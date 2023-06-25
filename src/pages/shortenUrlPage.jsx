import { ShortenUrlForm } from "../components";

function ShortenUrlPage() {
	return (
		<div>
			<h1 className="text-4xl font-bold text-gray-800">
				Shorten your long URL
			</h1>
			<ShortenUrlForm />
		</div>
	);
}

export default ShortenUrlPage;
