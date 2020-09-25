import axios from "axios";

class JoblyApi {
	static async request(endpoint, paramsOrData = {}, verb = "get") {
		paramsOrData._token = JSON.parse(window.localStorage.getItem("token"));
		// console.debug("API Call:", endpoint, paramsOrData, verb);
		try {
			const res = await axios({
				method: verb,
				url: `http://localhost:3001/${endpoint}`,
				[verb === "get" ? "params" : "data"]: paramsOrData
			});
			return res.data;
			// axios sends query string data via the "params" key,
			// and request body data via the "data" key,
			// so the key we need depends on the HTTP verb
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		return res.company;
	}
}
export default JoblyApi;
