const path = require("path");

/**
 * Builds the linting/formatting command to be run by lint-staged and husky.
 * @param {string[]} filenames
 * @returns
 */
const preCommit = (filenames) =>
	`next lint --fix --file ${filenames
		.map((f) => path.relative(process.cwd(), f))
		.join(" --file ")}`;

module.exports = {
	"*.{js,jsx,ts,tsx}": [preCommit, "npm run format"],
};
