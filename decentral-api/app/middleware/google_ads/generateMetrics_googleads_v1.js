const { spawn } = require("child_process");
require("dotenv").config();

const main = (keyword, period) => {
	return new Promise((resolve, reject) => {
		const customerIds = process.env.CUSTOMER_IDS;
		const path = require("path");
		const campaign = spawn("python3", [//Python3 for server version
			path.join(__dirname, "generate_metrics.py"),
			customerIds,
			keyword,
			period,
		]);

		let output = "";

		campaign.stdout.on("data", (data) => {
			output += data;
		});

		campaign.stderr.on("data", (data) => {
			console.log(`Error: ${data}`);
			reject(data);
		});

		campaign.on("close", (code) => {
			resolve(output);
		});
	});
};

async function getmetrics(keyword, period) {
	try {
		const output = await main(keyword, period);
		return JSON.parse(output);
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	getmetrics,
};
