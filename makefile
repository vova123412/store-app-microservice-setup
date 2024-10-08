#With .PHONY: Declaring clean as .PHONY tells make that clean is not a file target but a task that should always be executed when called, regardless of whether a file named clean exists.
PACKAGE=github.com/argoproj/argo-cd/v2/common
CURRENT_DIR=$(shell pwd)
DIST_DIR=${CURRENT_DIR}/dist
DOCKER?=docker
SERVER_SRCDIR?=$(CURRENT_DIR)/customer_server
NAMESPACE=default
MONGO_RELEASE_NAME=mongodb
MONGO_CHART=oci://registry-1.docker.io/bitnamicharts/mongodb 
KAFKA_RELEASE_NAME=kafka
KAFKA_CHART=oci://registry-1.docker.io/bitnamicharts/kafka

.PHONY: start-local
start-local: 
	kubectl create ns $(NAMESPACE) || true
	$(MAKE) deploy-mongo
	$(MAKE) deploy-kafka
	$(MAKE) deploy-keda
	$(MAKE)	deploy-prometheus
	@echo "the directory is  $(SERVER_SRCDIR)"
	@$(CURRENT_DIR)/hack/mirrord-runserver.sh  $(SERVER_SRCDIR) $(NAMESPACE)


.PHONY: deploy-mongo
deploy-mongo:
	@if helm status mongodb -n $(NAMESPACE) > /dev/null 2>&1; then \
		echo "Helm release $(MONGO_RELEASE_NAME) is already deployed."; \
	else \
		echo "Helm release $(MONGO_RELEASE_NAME) is not deployed. Deploying now..."; \
		helm install $(MONGO_RELEASE_NAME) $(MONGO_CHART) --values $(CURRENT_DIR)/prerequisites/mongodb.yaml  -n $(NAMESPACE); \
	fi

.PHONY: deploy-kafka
deploy-kafka:
	@if helm status kafka -n $(NAMESPACE) > /dev/null 2>&1; then \
		echo "Helm release $(KAFKA_RELEASE_NAME) is already deployed."; \
	else \
		echo "Helm release $(KAFKA_RELEASE_NAME) is not deployed. Deploying now..."; \
		helm install $(KAFKA_RELEASE_NAME) $(KAFKA_CHART) --values $(CURRENT_DIR)/prerequisites/kafka.yaml -n $(NAMESPACE); \
	fi

.PHONY: deploy-prometheus
deploy-prometheus:
	@if helm status prometheus -n $(NAMESPACE) > /dev/null 2>&1; then \
		echo "Helm release prometheus is already deployed."; \
	else \
		helm install prometheus prometheus --repo https://prometheus-community.github.io/helm-charts --values $(CURRENT_DIR)/prerequisites/prometheus.yaml -n $(NAMESPACE) ; \
	fi


.PHONY: deploy-keda
deploy-keda:
	@if helm status keda -n keda > /dev/null 2>&1; then \
		echo "Helm release keda is already deployed."; \
	else \
		helm install keda keda --repo https://kedacore.github.io/charts --namespace keda --create-namespace; \
	fi

	

.PHONY: uninstall
uninstall:
	helm uninstall $(KAFKA_RELEASE_NAME) -n $(NAMESPACE); \
	helm uninstall $(MONGO_RELEASE_NAME) -n $(NAMESPACE) ; 
	helm uninstall prometheus -n $(NAMESPACE) ; 
	@kubectl delete -f ./prerequisites/customerserver/ -n $(NAMESPACE)
.PHONY: start
start: 
	kubectl create ns unity-project || true
	$(MAKE) deploy-mongo
	$(MAKE) deploy-kafka
	$(MAKE)	deploy-prometheus
	$(MAKE) deploy-keda
	@$(DOCKER) build -t amir2023/customerserver ./customer_server
	@$(DOCKER) push "amir2023/customerserver:latest"
	@kubectl apply -f ./prerequisites/customerserver/ -n $(NAMESPACE)	
