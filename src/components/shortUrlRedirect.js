import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { getCookie } from "../helpers";

const baseUrl = config.Api.baseUrl;

const ShortUrlRedirect = () => {
	const { shortUrlId } = useParams();

	useEffect(() => {
		const accessToken = getCookie("access_token");

		const captureAnalytics = async () => {
			const analyticsData = {
				referer: document.referrer,
				userAgent: navigator.userAgent,
			};

			try {
				await axios.post(`${baseUrl}/analytics`, analyticsData, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
			} catch (error) {
				// Handle errors in capturing analytics
				console.error(error);
			}
		};

		const redirect = () => {
			captureAnalytics();

			window.location.href = `${baseUrl}/api/${shortUrlId}`;
		};

		redirect();
	}, [shortUrlId]);

	return null;
};

export default ShortUrlRedirect;
