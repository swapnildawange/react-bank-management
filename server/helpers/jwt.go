package helpers

import (
	"github.com/golang-jwt/jwt"

	logger "github.com/sirupsen/logrus"
)

type Claims struct {
	Id   string
	Role string
	jwt.StandardClaims
}

func NewJWTService() JWTService {
	return &jwtService{}
}

type JWTService interface {
	GenerateToken(Claims) (string, error)
	VerifyToken(string) (jwt.MapClaims, error)
}

type jwtService struct {
}

func (js *jwtService) GenerateToken(c Claims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)
	tokenString, err := token.SignedString([]byte("josh"))
	return tokenString, err
}

func (js *jwtService) VerifyToken(token string) (jwt.MapClaims, error) {
	decodedtoken, err := jwt.Parse(string(token), func(t *jwt.Token) (interface{}, error) {
		return []byte("josh"), nil
	})
	if err != nil {
		logger.WithField("err", err.Error()).Error(err)
		return nil, err
	}
	c := decodedtoken.Claims.(jwt.MapClaims)
	return c, err
}
