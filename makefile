.PHONY: build
build:
	docker-compose --env-file ./environments/.env.local build

.PHONY: test
test:
	docker-compose -f docker-compose.yaml -f docker-compose.test.yaml --env-file ./environments/.env.local build
	docker-compose -f docker-compose.yaml -f docker-compose.test.yaml --env-file ./environments/.env.local run api sh -c "pnpm run test"||:
	docker-compose --log-level ERROR stop