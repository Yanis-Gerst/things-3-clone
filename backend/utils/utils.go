package utils

import (
	"errors"
	"fmt"
	"net/mail"
	"reflect"
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
