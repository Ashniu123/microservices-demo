FROM golang:1.9.2-alpine

RUN mkdir -p /src/webapp/build
# RUN apk update
# RUN apk add git

COPY /src /src

COPY /webapp/build /src/webapp/build

ENV PORT 3000

WORKDIR /src

# RUN go get -d ./...
RUN go build -o main .

EXPOSE 3000

CMD ["/src/main"]