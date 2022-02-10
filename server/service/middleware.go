package service

import "net/http"

func setupCorsResponse(rw *http.ResponseWriter, req *http.Request) {
	(*rw).Header().Set("Content-Type", "text/html; charset=utf-8")
	(*rw).Header().Set("Access-Control-Allow-Origin", "*")
	(*rw).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*rw).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Authorization, X-Requested-With")
}
