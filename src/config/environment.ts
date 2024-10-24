type TEnvironment = "development" | "staging" | "production";

const environments = {
	development: {
		API_BASE_URL: "http://localhost:3000/api",
	},
	staging: {
		API_BASE_URL: "https://staging.example.com/api",
	},
	production: {
		API_BASE_URL: "https://example.com/api",
	},
};

const currentEnv = (process.env.NODE_ENV || "development") as TEnvironment;
export const { API_BASE_URL } = environments[currentEnv];
