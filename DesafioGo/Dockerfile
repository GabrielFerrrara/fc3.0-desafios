FROM golang:latest as builder

WORKDIR /go/src/app

COPY . .

RUN go build -o main

FROM scratch

WORKDIR /app

COPY --from=builder /go/src/app .

CMD ["./main"]