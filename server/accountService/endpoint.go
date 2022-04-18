package accountservice

import (
	"context"
	"go_bank_app/commonspec"
	"github.com/go-kit/kit/endpoint"
)

type Endpoints struct {
	NewAccountEndpoint endpoint.Endpoint
}

func MakeAccountEndpoints(svc Service) Endpoints {
	return Endpoints{
		NewAccountEndpoint: MakeNewAccountEndpoint(svc),
	}
}
func MakeNewAccountEndpoint(s Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (response interface{}, err error) {
		req := request.(commonspec.NewAccountRequest)
		NewAccountResponse, err := s.NewAccount(ctx, req)
		if err != nil {
			return nil, err
		}
		return NewAccountResponse, nil
	}
}
