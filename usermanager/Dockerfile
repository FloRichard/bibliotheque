FROM golang:alpine AS builder
RUN apk add --update --no-cache make build-base

WORKDIR $GOPATH/src/auth/

COPY . .

RUN make build

FROM alpine
COPY --from=builder /go/src/auth/usermanager /go/bin/usermanager

CMD ["/go/bin/usermanager"]