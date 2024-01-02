module.exports = {
	extends: 'standard-with-typescript',
	parserOptions: {
		project: './tsconfig.json'
	},
	ignorePatterns: ['jest.setup.js'],
	rules: {
		'no-console': 2,
		'@typescript-eslint/strict-boolean-expressions': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/no-throw-literal': 0,
		'@typescript-eslint/return-await': 0,
		'@typescript-eslint/restrict-template-expressions': 0,
		'indent': 'off'
	}
}
