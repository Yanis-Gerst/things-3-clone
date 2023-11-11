package authentifcation

import (
	"net/http"
	"thingsCloneServer/api/controllers"
	"thingsCloneServer/api/handlers"
	"thingsCloneServer/tokens"
	"thingsCloneServer/types"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type authOperation func(types.LogUserData) (types.UserWithEncryptedPasswordAndTodos, error)

func CreateAuthHandler(authDbOperation authOperation) http.HandlerFunc {
	authMiddleware := func(w http.ResponseWriter, r *http.Request, requestData types.LogUserData) (types.UserWithEncryptedPasswordAndTodos, error) {
		var response types.UserWithEncryptedPasswordAndTodos
		response, err := authDbOperation(requestData)
		if err != nil {
			handlers.HandleError(w, err, http.StatusNotFound)
			return response, err
		}

		user := types.User{Id: response.Id, Mail: response.Mail, Name: response.Name, Password: requestData.Password}

		expirationTime := time.Now().Add(5 * time.Minute)
		tokenString, err := tokens.CreateJwtToken(user, expirationTime)

		if err != nil {
			handlers.HandleError(w, err, http.StatusInternalServerError)
			return response, nil
		}

		http.SetCookie(w, &http.Cookie{
			Name:    "token",
			Value:   tokenString,
			Expires: expirationTime,
			Path:    "/",
		})

		return response, nil
	}

	return controllers.CreateBodyHandler[types.LogUserData, types.UserWithEncryptedPasswordAndTodos](authMiddleware, "")
}

func CreateSessionUserHandler(getUserById controllers.StorageOperationById[*types.UserWithTodos]) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		sessionCookie, err := r.Cookie("token")

		if err != nil {
			if err == http.ErrNoCookie {
				handlers.HandleError(w, err, http.StatusUnauthorized)
				return
			}
			handlers.HandleError(w, err, http.StatusBadRequest)
			return
		}

		tokenString := sessionCookie.Value

		token, claims, err := tokens.DecodeJwtToken(tokenString)

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				handlers.HandleError(w, err, http.StatusUnauthorized)
				return
			}
			handlers.HandleError(w, err, http.StatusBadRequest)
			return
		}

		if !token.Valid {
			handlers.HandleError(w, err, http.StatusUnauthorized)
			return
		}

		response, err := getUserById(claims.Id)
		if err != nil {
			handlers.HandleError(w, err, http.StatusInternalServerError)
			return
		}

		handlers.SendOkResponseWithBody(w, types.NewJsonResponse("sucess", response, "found session Id"))
	}

}
