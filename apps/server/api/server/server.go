package api

import (
	"encoding/json"
	"fmt"
	usersRouter "thingsCloneServer/api/endpoints/users"
	userAuthRouter "thingsCloneServer/api/endpoints/usersAuth"
	usersTodoRouter "thingsCloneServer/api/endpoints/usersTodo"
	usersTodosRouter "thingsCloneServer/api/endpoints/usersTodos"
	"thingsCloneServer/storage"

	"net/http"
)

type IListener = func(addr string, handler http.Handler) error

type Server struct {
	listenAddress string
	store         storage.Storer
	listener      IListener
}

func helloWorldHandler(w http.ResponseWriter, r *http.Request) {
	// Créer une structure pour le JSON
	response := struct {
		Message string `json:"message"`
	}{
		Message: "hello world",
	}

	// Convertir la structure en JSON
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Erreur interne du serveur", http.StatusInternalServerError)
		return
	}

	// Définir l'en-tête de contenu JSON
	w.Header().Set("Content-Type", "application/json")

	// Écrire le JSON dans la réponse
	w.Write(jsonResponse)
}

func NewServer(listenAddress string, store storage.Storer, listener IListener) *Server {
	return &Server{listenAddress: listenAddress, store: store, listener: listener}
}

func (server *Server) Start() error {
	fmt.Print("Server listening on ", server.listenAddress+"\n")
	mux := http.NewServeMux()

	http.Handle("/", http.HandlerFunc(helloWorldHandler))
	usersRouter.Use(mux, server.store)
	usersTodoRouter.Use(mux, server.store)
	usersTodosRouter.Use(mux, server.store)
	userAuthRouter.Use(mux, server.store)

	return server.listener(server.listenAddress, mux)
}
