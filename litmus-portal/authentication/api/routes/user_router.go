package routes

import (
	"litmus/litmus-portal/authentication/api/handlers"
	"litmus/litmus-portal/authentication/api/middleware"
	"litmus/litmus-portal/authentication/pkg/user"

	"github.com/gin-gonic/gin"
)

// UserRouter creates all the required routes for user authentications purposes.
func UserRouter(router *gin.Engine, service user.Service) {
	router.POST("/login", handlers.LoginUser(service))
	router.Use(middleware.JwtMiddleware())
	router.POST("/update/password", handlers.UpdatePassword(service))
	router.POST("/reset/password", handlers.ResetPassword(service))
	router.POST("/create", handlers.CreateUser(service))
	router.POST("/update/details", handlers.UpdateUser(service))
	router.GET("/users", handlers.FetchUsers(service))
	router.POST("/updatestate", handlers.UpdateUserState(service))
}
