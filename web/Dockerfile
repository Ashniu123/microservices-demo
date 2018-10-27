FROM golang:1.9.2-alpine as builder

WORKDIR /usr/app

COPY ./src .

RUN go build -o main .

FROM alpine:latest

WORKDIR /usr/app

COPY --from=builder /usr/app/main ./main
COPY ./webapp/build ./webapp/build

ENV PORT 3000

EXPOSE 3000

CMD ["./main"]