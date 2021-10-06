FROM golang:alpine AS builder
RUN apk add --update --no-cache make build-base

WORKDIR $GOPATH/src/lib/

COPY . .

RUN make build

FROM alpine
COPY --from=builder /go/src/lib/librarygateway /go/bin/librarygateway

CMD ["/go/bin/librarygateway"]