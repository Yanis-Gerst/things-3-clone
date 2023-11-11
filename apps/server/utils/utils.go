package utils

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/mail"
	"reflect"
	"thingsCloneServer/types"

	"golang.org/x/crypto/bcrypt"
)

func AllFieldsIsDefined(s interface{}) error {
	structType := reflect.TypeOf(s)
	if structType.Kind() != reflect.Struct {
		return errors.New("input param should be a struct")
	}

	structVal := reflect.ValueOf(s)
	fieldNum := structVal.NumField()

	for i := 0; i < fieldNum; i++ {
		field := structVal.Field(i)
		fieldName := structType.Field(i).Name

		isSet := field.IsValid() && !field.IsZero()

		if !isSet {
			return errors.New(fmt.Sprintf("%v in not set; ", fieldName))
		}
	}
	return nil
}

func IsValidEmail(email string) error {
	_, err := mail.ParseAddress(email)
	return err
}

func TypeJsonConverter[T any](data any) (*T, error) {
	var result T
	b, err := json.Marshal(&data)

	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(b, &result)
	if err != nil {
		return nil, err
	}
	return &result, err
}

func EncryptUserPassword(user types.User) (*types.UserWithEncryptedPassword, error) {
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 1)
	if err != nil {
		return nil, nil
	}

	return &types.UserWithEncryptedPassword{Id: user.Id, Name: user.Name, Password: hashPassword, Mail: user.Mail}, nil
}
