import { useState, useEffect } from "react";
import { ListGroup, Button, Alert, Pagination } from "react-bootstrap";
import axios from "axios";
import config from "../config";
import { getCookie } from "../helpers";

function UserUrlsPage() {
	const [userUrls, setUserUrls] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [qrcodeUrl, setQrcodeUrl] = useState("");

	useEffect(() => {
		const fetchUserUrls = async () => {
			try {
				const { baseUrl } = config.Api;
				const accessToken = getCookie("access_token");

				await axios
					.get(`${baseUrl}/url`, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						params: {
							skip: (currentPage - 1) * 10,
							take: 10, // Set the desired limit per page
						},
					})
					.then(({ data }) => {
						console.log("response.data: ", data);

						setUserUrls(data.urls);
						setTotalPages(data.count);
					})
					.catch((error) => {
						console.log("error: ", error);
					});
			} catch (error) {
				console.log(error);
			}
		};

		fetchUserUrls();
	}, [currentPage]);

	const handleDeleteUrl = async (shortUrlId) => {
		try {
			const { baseUrl } = config.Api;
			const accessToken = getCookie("access_token");

			await axios.delete(`${baseUrl}/url/${shortUrlId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			// Remove the deleted URL from the userUrls state
			setUserUrls((prevUserUrls) =>
				prevUserUrls.filter((url) => url.shortUrlId !== shortUrlId)
			);
		} catch (error) {
			console.log(error);
		}
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleGenerateQrcode = (shortUrlId) => {
		try {
			const { baseUrl } = config.Api;
			const accessToken = getCookie("access_token");

			axios
				.post(`${baseUrl}/url/qrcode/${shortUrlId}`, null, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
				.then(({ data }) => {
          console.log("qrcode data: ", data);
					setQrcodeUrl(data.image);
				})
				.catch((error) => {
					console.log("error: ", error);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h2>URLs</h2>

			{!userUrls || userUrls.length === 0 ? (
				<Alert variant="info">No URLs created yet.</Alert>
			) : (
				<>
					<ListGroup>
						{userUrls.map((url) => (
							<ListGroup.Item key={url.id}>
								<div>Original URL: {url.longUrl}</div>
								<div>Short URL: {url.shortUrl}</div>
								<Button
									variant="danger"
									onClick={() => handleDeleteUrl(url.shortUrlId)}
								>
									Delete
								</Button>
								<Button
									variant="primary"
									onClick={() => handleGenerateQrcode(url.shortUrlId)}
								>
									Generate QR Code
								</Button>
							</ListGroup.Item>
						))}
					</ListGroup>

					{qrcodeUrl && (
						<div className="mt-4">
							<h5>QR Code:</h5>
							<img src={qrcodeUrl} alt="QR Code" />
						</div>
					)}

					<Pagination>
						{Array.from({ length: totalPages }, (_, index) => index + 1).map(
							(page) => (
								<Pagination.Item
									key={page}
									active={page === currentPage}
									onClick={() => handlePageChange(page)}
								>
									{page}
								</Pagination.Item>
							)
						)}
					</Pagination>
				</>
			)}
		</div>
	);
}

export default UserUrlsPage;
