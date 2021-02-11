install:
	npm install

genDiff:
	node genDiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .
