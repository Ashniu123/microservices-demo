@echo off
cd src
go build -a -installsuffix cgo -o main.exec .
move main.exec ..\
cd ..
echo Build complete