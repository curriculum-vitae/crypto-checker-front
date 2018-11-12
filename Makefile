PROJECT_NAME := checkmynode.static
TARBALL_NAME := $(PROJECT_NAME).$(shell date -u +%F).tgz

usage:
	@echo "First of all, run make build-docker once to make an image"
	@echo "Then run make build-static any time you wanna make new build"

clean:
	for DIR in . ;\
	do\
		rm -rf $$DIR/.\* $$DIR\*~ $$DIR\*/\*~;\
	done

build-docker:
	sudo docker build -t checkmynode .

build-static:
	sudo docker run -it \
	-v ${PWD}:/opt/app \
	-v /opt/app/node_modules \
	--rm \
	checkmynode npm run-script build

tarball:
	rm -rf $(TARBALL_NAME)
	tar -czvf $(TARBALL_NAME) -C build .

