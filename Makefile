PATH:=./node_modules/.bin/:${PATH}

js := $(shell find lib -type f -name "*.js")
dependencies := $(shell calcdeps -i lib/fonzie.js -p lib -p vendor/goog -o list)
dependency_list = $(subst $(eval) , --js ,$(wildcard $1))

build/fonzie.js: $(js)
	mkdir -p build
	java -jar vendor/goog/compiler.jar --flagfile compiler-options --define='goog.DEBUG=false' --js $(call dependency_list,$(dependencies)) > $@

build/fonzie-debug.js: $(js)
	mkdir -p build
	java -jar vendor/goog/compiler.jar --flagfile compiler-options --debug=true --formatting=PRETTY_PRINT --formatting=PRINT_INPUT_DELIMITER --js $(call dependency_list,$(dependencies)) > $@

build/deps.js: $(js)
	mkdir -p build
	calcdeps -i lib/fonzie.js -p lib -d vendor/goog/ -o deps > $@

.PHONY: clean
clean:
	-rm -rf build
