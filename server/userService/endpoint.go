package createrequest

import (
	"context"
	"go_bank_app/commonspec"

	"github.com/go-kit/kit/endpoint"
)

type Endpoints struct {
	CreateUserEndpoint endpoint.Endpoint
	UpdateUserEndpoint endpoint.Endpoint
	DeleteUserEndpoint endpoint.Endpoint
}

func MakeEndpoints(s Service) Endpoints {
	return Endpoints{
		CreateUserEndpoint: MakeCreateUserEndpoint(s),
		UpdateUserEndpoint: MakeUpdateUserEndpoint(s),
		DeleteUserEndpoint: MakeDeleteUserEndpoint(s),
	}
}

func MakeCreateUserEndpoint(s Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (response interface{}, err error) {
		req := request.(commonspec.CreateUserRequest)
		err = s.CreateUser(req.User)
		if err != nil {
			return nil, err
		}
		return
	}
}

func MakeUpdateUserEndpoint(s Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (response interface{}, err error) {
		req := request.(commonspec.UpdateUserRequest)
		err = s.UpdateUser(req.User)
		if err != nil {
			return nil, err
		}
		return
	}
}

func MakeDeleteUserEndpoint(s Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (response interface{}, err error) {
		req := request.(commonspec.DeleteUserRequest)
		err = s.DeleteUser(req.User)
		if err != nil {
			return nil, err
		}
		return
	}
}
