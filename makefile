.PHONY: build
build:
	docker-compose --env-file ./environments/.env.local build

.PHONY: test
test:
	docker-compose --env-file ./environments/.env.local run test sh -c "pnpm run test"