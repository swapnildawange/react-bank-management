package userService

type Service interface {
	CreateUser(user *User) error
	UpdateUser(user *User) error
	DeleteUser(user *User) error
}

type BL struct {
	service Service
}

func NewBL(service Service) *BL {
	return &BL{
		service: service,
	}
}

func (bl *BL) CreateUser(user *User) (err error) {
	return
}

func (bl *BL) UpdateUser(user *User) (err error) {
	return
}

func (bl *BL) DeleteUser(user *User) (err error) {
	return
}
