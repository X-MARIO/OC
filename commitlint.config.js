module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'body-leading-blank': [2, 'never'],
		'body-max-line-length': [0, 'always', 100],
		'type-enum': [
			2,
			'always',
			[
				'build',
				'chore',
				'feat',
				'fix',
				'perf',
				'refactor',
				'revert',
				'style',
				'test',
				'ci',
				'docs',
			],
		],
	},
};
