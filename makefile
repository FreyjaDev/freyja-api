TEST_PARAM=-f docker-compose.yaml -f docker-compose.test.yaml --env-file ./environments/.env.local

.PHONY: build
build:
	docker-compose --env-file ./environments/.env.local build

.PHONY: test
test:
	docker-compose $(TEST_PARAM) build
	docker-compose $(TEST_PARAM) run api sh -c "pnpm run migrate && pnpm run test"||:
	docker-compose $(TEST_PARAM) down --remove-orphans