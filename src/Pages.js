
// logic for pagination.
// accepts an array and starting index and will return 20 items of the array at a time

const pages = (arr, start) => {
	const page = [];
	for (let i = start; i < start + 20; i++) {
		// return before pushing undefined value to array
		if (arr[i] === undefined) {
			return page;
		}
		page.push(arr[i]);
	}
	return page;
};

export default pages;
