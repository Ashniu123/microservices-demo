package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	fs := http.FileServer(http.Dir("./webapp/build"))

	http.Handle("/", fs)
	// http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	// 	r.Header.Set("Content-Type", "text/html")
	// 	http.ServeFile(w, r, "../webapp/build/index.html")
	// })

	log.Println("WEB server running on :" + os.Getenv("PORT"))
	err := http.ListenAndServe(":"+os.Getenv("PORT"), nil)

	if err != nil {
		log.Fatal(err)
	}
}
