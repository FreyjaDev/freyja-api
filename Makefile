ENV_PARAM=--env-file ./environments/.env.local

.PHONY: build serve

build:
	docker-compose --env-file ./environments/.env.local build

serve:
	@make build
	docker-compose $(ENV_PARAM) up

migrate:
	docker-compose -f docker-compose.yaml -f docker-compose.migration.yaml $(ENV_PARAM) build
	docker-compose -f docker-compose.yaml -f docker-compose.migration.yaml $(ENV_PARAM) run --rm api sh -c "bun run migrate:run"