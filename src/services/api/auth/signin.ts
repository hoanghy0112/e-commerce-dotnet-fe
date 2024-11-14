import { API_URLS } from "@/config/api-urls";
import axios from "axios";

export async function signInAPI(
	input: CredentialInput
): Promise<SignInAPIResponse> {
	const response = await axios.post(`${API_URLS.auth.signin}`, {
		email: input.username,
		password: input.password,
	});

	return response.data;
}
