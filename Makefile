###############################################################################
## NodeJS,NPM and more                                                       ##
###############################################################################

npm_install:
	@echo
	@echo "+ + + Run NPM Install:  +  +  + "
	@npm install


###############################################################################
## Docker Compose made easy                                                  ##
###############################################################################

dev_ps:
	docker-compose -f docker-compose.yml -f docker-compose.overwrite.yml ps

dev_up:
	docker-compose -f docker-compose.yml -f docker-compose.overwrite.yml up -d

dev_down:
	docker-compose -f docker-compose.yml -f docker-compose.overwrite.yml down

dev_logs:
	docker-compose -f docker-compose.yml -f docker-compose.overwrite.yml logs -f --tail 100

prod_ps:
	@docker-compose ps

prod_up:
	@docker-compose up -d

prod_down:
	@docker-compose down

prod_logs:
	@docker-compose logs -f --tail 1000

###############################################################################
## Build, push, and release                                                  ##
###############################################################################
export CI_BUILD_REGISTRY="docker-registry.web.louis.de"

docker_build:
	@echo
	@echo "+ + + Build:  +  +  + "
	@docker-compose build

docker_push:
	@echo "+ + + Push:  +  +  + "
	@docker-compose push

docker_pull:
	@echo "+ + + Push:  +  +  + "
	@docker-compose pull

docker_release_ci:
	@echo "+ + + Run Release to Registry:  +  +  + "
	@make docker_login_ci
	@make docker_build
	@make docker_push
	@make docker_logout

docker_deploy_ci:
	@echo "+ + + Run Deploy (on Host):  +  +  + "
	@make docker_login_ci
	@make docker_pull
	@make prod_down
	@make prod_up
	@make docker_logout

docker_login_ci:
	@echo "+ + + Login into registry: ${CI_BUILD_REGISTRY} +  +  + "
	@docker login -u gitlab-ci-token -p ${CI_JOB_TOKEN} ${CI_BUILD_REGISTRY}

docker_logout:
	@echo "+ + + Logout from registry: ${CI_BUILD_REGISTRY} +  +  + "
	@docker logout ${CI_BUILD_REGISTRY}
