MIGRATE_PARAM=-f docker-compose.yaml -f docker-compose.source.yaml
TEST_PARAM=-f docker-compose.yaml -f docker-compose.source.yaml -f docker-compose.test.yaml
ENV_PARAM=--env-file ./environments/.env.local

.PHONY: build test serve migrate down

build:
	docker-compose --env-file ./environments/.env.local build

test:
	docker-compose $(TEST_PARAM) $(ENV_PARAM) build
	docker-compose $(TEST_PARAM) $(ENV_PARAM) run --rm api sh -c "pnpm run migrate && pnpm run test"||:

serve:
	@make build
	docker-compose $(ENV_PARAM) up

down:
	docker-compose $(ENV_PARAM) down

migrate:
	docker-compose ${MIGRATE_PARAM} $(ENV_PARAM) build
	docker-compose ${MIGRATE_PARAM} $(ENV_PARAM) run --rm api sh -c "pnpm run migrate"
