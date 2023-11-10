package tokens

import (
	"example/crud-todo-app/backend/types"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	Id types.ID `json:"_id" bson:"_id"`
	jwt.RegisteredClaims
}

var jwtKey = []byte(os.Getenv("KEY"))

func CreateJwtToken(user types.User, expirationTime time.Time) (string, error) {
	claims := &Claims{
		Id: types.ID(user.Id.Hex()),
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)

	return tokenString, err
}

func DecodeJwtToken(tokenString string) (*jwt.Token, *Claims, error) {

	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (any, error) {
		return jwtKey, nil
	})

	return token, claims, err
}
