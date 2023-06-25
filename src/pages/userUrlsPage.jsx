import { useState, useEffect } from "react";
import { ListGroup, Button, Alert, Pagination } from "react-bootstrap";
import axios from "axios";
import config from "../config";
import { getCookie } from "../helpers";

function UserUrlsPage() {
	const [userUrls, setUserUrls] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const fetchUserUrls = async () => {
			try {
				const { baseUrl } = config.Api;
				const accessToken = getCookie("access_token");

				axios
					.get(`${baseUrl}/url`, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						params: {
							skip: (currentPage - 1) * 5,
							take: 5, // Set the desired limit per page
						},
					})
					.then(({ data }) => {
						setUserUrls(data.urls);
						setTotalPages(Math.ceil(data.count / 5));
						console.log("totalPages: ", totalPages);
					})
					.catch((error) => {
						console.log("error: ", error);
					});
			} catch (error) {
				console.log(error);
			}
		};

		fetchUserUrls();
	}, [currentPage, totalPages]);

	const handleDeleteUrl = (shortUrlId) => {
		const baseUrl = config.Api.baseUrl;
		const accessToken = getCookie("access_token");

		axios
			.delete(`${baseUrl}/url/${shortUrlId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			// eslint-disable-next-line no-unused-vars
			.then(({ data }) => {
				// Remove the deleted URL from the userUrls state
				setUserUrls((prevUserUrls) =>
					prevUserUrls.filter((url) => url.shortUrlId !== shortUrlId)
				);
			})
			.catch((error) => {
				console.log("error: ", error);
			});
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
					// Update the URL with the generated QR code
					setUserUrls((prevUserUrls) =>
						prevUserUrls.map((url) =>
							url.shortUrlId === shortUrlId
								? { ...url, qrcode: data.image }
								: url
						)
					);
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
								{url.qrcode ? (
									<>
										<img src={url.qrcode} alt="QR Code" />
										<Button
											variant="primary"
											onClick={() => handleGenerateQrcode(url.shortUrlId)}
										>
											Regenerate QR Code
										</Button>
									</>
								) : (
									<Button
										variant="primary"
										onClick={() => handleGenerateQrcode(url.shortUrlId)}
									>
										Generate QR Code
									</Button>
								)}
								<Button
									variant="danger"
									onClick={() => handleDeleteUrl(url.shortUrlId)}
								>
									Delete
								</Button>
							</ListGroup.Item>
						))}
					</ListGroup>

					{totalPages > 1 && ( // Hide pagination when there is only one page
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
					)}
				</>
			)}
		</div>
	);
}

export default UserUrlsPage;
