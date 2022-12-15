# This makefile uses only POSIX 'make' features, except for the
# following widely implemented extensions -- the .PHONY target, which
# marks targets that don't generate a file whose name is the same as the
# target, and prerequisites that depend on glob expansion.

.POSIX:
.SUFFIXES:

.DEFAULT: preview
.IGNORE: preview
.PHONY: preview
preview:
	swift package --disable-sandbox preview-documentation --experimental-enable-custom-templates

.PHONY: archive
archive: .build/plugins/Swift-DocC/outputs/TSPL.doccarchive

.build/plugins/Swift-DocC/outputs/TSPL.doccarchive: Sources/TSPL/TSPL.docc/*/*.md
.build/plugins/Swift-DocC/outputs/TSPL.doccarchive: Sources/TSPL/TSPL.docc/Assets/*.png
	swift package generate-documentation --experimental-enable-custom-templates
