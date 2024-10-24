type TEnvironment = "mock" | "development" | "staging" | "production";

const environments = {
	mock: {
		API_BASE_URL: "http://localhost:3000/api",
	},
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

export const currentEnv = (process.env.NODE_ENV || "development") as TEnvironment;
export const { API_BASE_URL } = environments[currentEnv];
