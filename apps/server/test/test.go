package test

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
	"thingsCloneServer/types"
)

type Api struct {
	Name               string
	Request            *http.Request
	ExpectedResponse   any
	ExpectedStatusCode int
	Handler            http.HandlerFunc
	Cleanup            func()
}

func (apiTest Api) failedPrefixMessage() string {
	return fmt.Sprintf(`%v FAILED: `, apiTest.Name)
}

func RunApiTest(t *testing.T, apiTests []Api) {

	for _, apiTest := range apiTests {

		response := httptest.NewRecorder()
		apiTest.Handler.ServeHTTP(response, apiTest.Request)
		value, errJson := ConvertJsonResponseToGoValue(response)

		if errJson != nil {
			t.Errorf(apiTest.failedPrefixMessage()+`can't convert json response to golang value. We got %v, expected %v. Get Error %v`,
				response.Body, apiTest.ExpectedResponse, errJson)
			return
		}

		passed := Assert(Equals(response.Code, apiTest.ExpectedStatusCode))
		if !passed {
			t.Errorf(apiTest.failedPrefixMessage()+`handler returned wrong Http status code. We got %v expected %v`,
				response.Code, apiTest.ExpectedStatusCode)
			return
		}

		passed = Assert(EqualsJson(value, apiTest.ExpectedResponse))
		if !passed {
			t.Errorf(apiTest.failedPrefixMessage()+"handler returned unexpected body got %v expected %v",
				value, apiTest.ExpectedResponse)
			return
		}

		t.Logf("%v PASSED", apiTest.Name)
		if apiTest.Cleanup != nil {
			apiTest.Cleanup()
		}

	}
}
func Assert(condition bool) bool {
	if !condition {
		return false
	}
	return true
}

func Equals(v1 any, v2 any) bool {

	if reflect.DeepEqual(v1, v2) {
		return true
	}
	return false
}

func EqualsJson(v1 any, v2 any) bool {
	v1Json, err := json.Marshal(v1)
	v2Json, err := json.Marshal(v2)
	if err != nil {
		panic(err)
	}
	return string(v2Json) == string(v1Json)
}

func MockEnvVariable(t *testing.T) {
	t.Setenv("MONGO_DB_URI", "mongodb+srv://Ikims:NHesQlxy093N5he2@cluster0.xelbcg5.mongodb.net/")
	t.Setenv("DB_NAME", "Test")
	t.Setenv("USER_COLLECTION", "Users")
	t.Setenv("TODOS_COLLECTION", "Todos")
}

func CreateRequestWithBodyJson(method string, url string, body any) *http.Request {
	data, err := json.Marshal(body)

	if err != nil {
		panic(err)
	}
	request, err := http.NewRequest(method, url, bytes.NewReader(data))

	if err != nil {
		panic(err)
	}
	return request
}

func ConvertJsonResponseToGoValue(response *httptest.ResponseRecorder) (types.JsonResponse[map[string]any], error) {
	var responseData types.JsonResponse[map[string]any]
	err := json.Unmarshal(response.Body.Bytes(), &responseData)
	return responseData, err
}
