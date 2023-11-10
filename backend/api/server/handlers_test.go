package api

import (
	"example/crud-todo-app/backend/storage"
	"example/crud-todo-app/backend/test"
	"example/crud-todo-app/backend/types"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"testing"
)

func getServer() *Server {
	server := NewServer("mockAddress", storage.NewStorer())
	return server
}

// TODO: Test Post Invalid User Body
func TestServer_GetUserByLogIng(t *testing.T) {
	test.MockEnvVariable(t)
	server := getServer()
	apiTests := []test.Api{
		{
			Name:    "Log User Request",
			Request: test.CreateRequestWithBodyJson(http.MethodGet, "/users", &types.LogUserData{Mail: "testUser@gmail.com", Password: "test"}),
			ExpectedResponse: types.NewJsonResponse("success", map[string]any{
				"_id":      "646b336a302014633f05d473",
				"name":     "testUser",
				"mail":     "testUser@gmail.com",
				"password": "test",
				"todos": []map[string]string{
					{
						"_id":          "646a0cbfedec5a79ddba2dd3",
						"title":        "Build Go Api",
						"createdAt":    "2012-04-23T18:25:43.511Z",
						"deadlineAt":   "2012-06-23T18:25:43.511Z",
						"descriptions": "GoLand > VsCode with go",
						"userId":       "646b336a302014633f05d473",
					},
				},
			}, "log successful"),
			ExpectedStatusCode: http.StatusOK,
			Handler:            server.HandleGetUserLogging,
		},
		{
			Name: "Post User",
			Request: test.CreateRequestWithBodyJson(http.MethodPost, "/users", &types.User{
				Id:       primitive.ObjectID{},
				Name:     "PostTest",
				Mail:     "postTest@gmail.com",
				Password: "test",
			}),
			ExpectedResponse:   types.NewJsonResponse[interface{}]("success", nil, "Data have been send"),
			ExpectedStatusCode: 200,
			Handler:            server.HandlePostUser,
			Cleanup:            cleanUpPost(server),
		},
		{
			Name: "Delete User",
			Request: test.CreateRequestWithBodyJson(http.MethodDelete, "/users", map[string]types.ID{
				"_id": types.ID(primitive.ObjectID{}.Hex()),
			}),
			ExpectedResponse:   types.NewJsonResponse[interface{}]("success", nil, "one item have been delete"),
			ExpectedStatusCode: 200,
			Handler:            server.HandleDeleteUser,
			Cleanup:            cleanUpDelete(server),
		},
		{
			Name: "Update User",
			Request: test.CreateRequestWithBodyJson(http.MethodPut, "/users", map[string]string{
				"_id":      "646f7a8b608356b17160b9a7",
				"name":     "updatedUser",
				"mail":     "updateUser@gmail.com",
				"password": "test",
			}),
			ExpectedResponse:   types.NewJsonResponse[interface{}]("success", nil, "one item have been updated"),
			ExpectedStatusCode: 200,
			Handler:            server.HandleUpdateUser,
			Cleanup:            cleanUpPut(server),
		},
		{
			Name: "Delete non existent user",
			Request: test.CreateRequestWithBodyJson(http.MethodDelete, "/users", map[string]types.ID{
				"_id": types.ID(primitive.NewObjectID().Hex()),
			}),
			ExpectedResponse:   types.NewJsonResponse[interface{}]("error", nil, "not found item"),
			ExpectedStatusCode: 404,
			Handler:            server.HandleDeleteUser,
		},
		{
			Name: "Invalid User Format",
			Request: test.CreateRequestWithBodyJson(http.MethodPost, "/users", &types.User{
				Id:       primitive.ObjectID{},
				Name:     "PostTest",
				Password: "test",
			}),
			ExpectedResponse:   types.NewJsonResponse[interface{}]("error", nil, "wrong user format"),
			ExpectedStatusCode: http.StatusBadRequest,
			Handler:            server.HandlePostUser,
		},
	}

	test.RunApiTest(t, apiTests)
}

func cleanUpPost(server *Server) func() {
	return func() {
		toDeleteUser, _ := server.store.GetUserWithTodosByLogin(types.LogUserData{Mail: "postTest@gmail.com", Password: "test"})
		id := types.ID(toDeleteUser[0].Id.Hex())
		_ = server.store.DeleteUser(id)
	}
}

func cleanUpDelete(server *Server) func() {
	return func() {
		_ = server.store.PostUser(types.User{Id: primitive.ObjectID{}, Name: "deleteUser", Mail: "deleteUser@gmail.com", Password: "test"})
	}
}

func cleanUpPut(server *Server) func() {
	return func() {
		_ = server.store.UpdateUser(types.User{
			Id:       getObjId("646f7a8b608356b17160b9a7"),
			Name:     "updatedUser",
			Mail:     "updateUser@gmail.com",
			Password: "test",
		})
	}
}

func getObjId(s string) primitive.ObjectID {
	objId, err := primitive.ObjectIDFromHex(s)
	if err != nil {
		panic(err)
	}
	return objId
}

func compareJsonResponse(v1 types.JsonResponse[map[string]any], v2 types.JsonResponse[map[string]any]) bool {
	if v1.Status != v2.Status || v1.Message != v2.Message {
		return false
	}
	if (v1.Data == nil && v2.Data != nil) || (v1.Data != nil && v2.Data == nil) {
		return false
	}
	keysOfV1 := GetKeys(v1.Data)
	keysOfV2 := GetKeys(v2.Data)
	if len(keysOfV1) != len(keysOfV2) {
		return false
	}
	for _, key := range keysOfV1 {
		if v1.Data[key] != v2.Data[key] {
			return false
		}
	}
	return true
}

func GetKeys[M ~map[K]V, K comparable, V any](m M) []K {
	r := make([]K, 0, len(m))
	for k := range m {
		r = append(r, k)
	}
	return r
}
