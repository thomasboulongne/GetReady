deploy-dev:
	ssh thomasboulongne@151.80.38.136 "bash -i -c 'cd www/GetReady/; git clean -fd; git checkout -- .; git pull; rm -rf ./dist; yarn generate;'"
