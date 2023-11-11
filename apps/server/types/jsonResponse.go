package types

type JsonResponse[T any] struct {
	Status  string `json:"status"`
	Data    T      `json:"data"`
	Message string `json:"msg"`
}

func NewJsonResponse[T any](status string, data T, message string) JsonResponse[T] {
	return JsonResponse[T]{Status: status, Data: data, Message: message}
}
