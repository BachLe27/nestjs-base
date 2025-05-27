.PHONY: up down build restart logs clean help


DOCKER_DEV_COMPOSE_FILE = docker/docker-compose.yml
APP_NAME = koc-hub-server
# Default target
help:
	@echo "Available commands:"
	@echo "  make init        - Start the containers in detached mode"
	@echo "  make down      - Stop and remove containers"
	@echo "  make build     - Build the containers"
	@echo "  make restart   - Restart the containers"
	@echo "  make logs      - Show container logs"
	@echo "  make clean     - Remove containers, networks, and volumes"

# Start containers in detached mode
init:
	docker compose -f $(DOCKER_DEV_COMPOSE_FILE) --env-file .env up --build -d  

# Stop and remove containers
down:
	docker compose down

# Build containers
build:
	docker compose build

# Restart containers
restart:
	docker compose restart

# Show container logs
logs:
	docker compose logs -f

# Clean up containers, networks, and volumes
clean:
	docker compose down -v
	docker system prune -f 


connect:
	docker exec -it $(APP_NAME) sh