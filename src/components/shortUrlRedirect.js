import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

const baseUrl = config.Api.baseUrl;

const ShortUrlRedirect = () => {
	const { shortUrlId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`${baseUrl}/api/${shortUrlId}`)
			.then(({ longUrl }) => {
        console.log("longUrl", longUrl);
        if (longUrl) {
          window.location.href = longUrl;
        } else {
          navigate("/404");
        }
			})
			.catch((err) => {
				console.error(err);
				navigate("/404");
			});
	}, [shortUrlId]);

	return null;
};

export default ShortUrlRedirect;
