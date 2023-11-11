package types

import "net/http"

type MapMethodHandler map[string]http.HandlerFunc
