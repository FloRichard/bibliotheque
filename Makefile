deploy:
	docker-compose -f ./authproxy/docker-compose.yaml up -d --build --force-recreate;
	docker-compose -f ./librarygateway/docker-compose.yaml up -d --build --force-recreate;
	docker-compose -f ./usermanager/docker-compose.yaml up -d --build --force-recreate;
	docker-compose -f ./librarymanager/docker-compose.yaml up -d --build --force-recreate;
down:
	docker-compose -f ./authproxy/docker-compose.yaml stop;
	docker-compose -f ./librarygateway/docker-compose.yaml stop;
	docker-compose -f ./usermanager/docker-compose.yaml stop;
	docker-compose -f ./librarymanager/docker-compose.yaml stop;

	docker-compose -f ./authproxy/docker-compose.yaml down;
	docker-compose -f ./librarygateway/docker-compose.yaml down;
	docker-compose -f ./usermanager/docker-compose.yaml down;
	docker-compose -f ./librarymanager/docker-compose.yaml down;