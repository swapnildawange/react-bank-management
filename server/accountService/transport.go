package accountservice

import (
	"context"
	"encoding/json"
	"go_bank_app/commonspec"
	"net/http"

	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/gorilla/mux"
)

// func NewHTTPHandler(s Service, logger log.Logger) http.Handler {
// 	router := mux.NewRouter()
// 	e := MakeAccountEndpoints(s)
// 	router.Methods("POST").Path("/accounts").Handler(httptransport.NewServer(e.NewAccountEndpoint, decodeNewAccountRequest, encodeResponse))
// 	return router
// }
func NewHTTPHandler(ctx context.Context, endpoints Endpoints) http.Handler {
	r := mux.NewRouter()
	r.Use(commonMiddleware)

	r.Methods("GET").Path("/user").Handler(httptransport.NewServer(
		endpoints.NewAccountEndpoint,
		decodeNewAccountRequest,
		encodeResponse,
	))

	// r.Methods("GET").Path("/user/{id}").Handler(httptransport.NewServer(
	// 	endpoints.GetUser,
	// 	decodeEmailReq,
	// 	encodeResponse,
	// ))

	return r
}
func commonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}
func decodeNewAccountRequest(ctx context.Context, r *http.Request) (request interface{}, err error) {
	var req commonspec.NewAccountRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		return nil, err
	}
	return req, nil
}

// func codeFrom(err error) int {
// 	switch err {
// 	case ErrNotFound:
// 		return http.StatusNotFound
// 	case ErrAlreadyExists, ErrInconsistentIDs:
// 		return http.StatusBadRequest
// 	default:
// 		return http.StatusInternalServerError
// 	}
// }
func encodeError(_ context.Context, err error, w http.ResponseWriter) {
	if err == nil {
		panic("encodeError with nil error")
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	// w.WriteHeader(codeFrom(err))
	json.NewEncoder(w).Encode(map[string]interface{}{
		"error": err.Error(),
	})
}

type errorer interface {
	error() error
}

func encodeResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	return json.NewEncoder(w).Encode(response)
}
