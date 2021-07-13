package main

import (
	"flag"
	"fmt"
	"litmus/litmus-portal/authentication/api/routes"
	"litmus/litmus-portal/authentication/pkg/entities"
	"litmus/litmus-portal/authentication/pkg/user"
	"litmus/litmus-portal/authentication/pkg/utils"
	"runtime"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func main() {
	// send logs to stderr so we can use 'kubectl logs'
	_ = flag.Set("logtostderr", "true")
	_ = flag.Set("v", "3")

	flag.Parse()
	// Version Info
	printVersion()

	db, err := utils.DatabaseConnection()
	if err != nil {
		log.Fatal("database connection error $s", err)
	}
	err = utils.CreateIndex(utils.CollectionName, utils.UsernameField, db)
	if err != nil {
		log.Fatalf("failed to create index  %s", err)
	}

	userCollection := db.Collection(utils.CollectionName)
	userRepo := user.NewRepo(userCollection)
	userService := user.NewService(userRepo)
	validatedAdminSetup(userService)

	gin.SetMode(gin.ReleaseMode)
	gin.EnableJsonDecoderDisallowUnknownFields()
	app := gin.Default()
	config := cors.DefaultConfig()
	config.AddAllowHeaders("Access-Control-Allow-Origin")
	config.AllowAllOrigins = true
	app.Use(cors.New(config))
	routes.UserRouter(app, userService)
	err = app.Run(utils.Port)
	if err != nil {
		log.Fatalf("Failure to start litmus-portal authentication server due to %s", err)
	}
}

func validatedAdminSetup(service user.Service) {
	configs := map[string]string{"ADMIN_PASSWORD": utils.AdminPassword, "ADMIN_USERNAME": utils.AdminName, "DB_USER": utils.DBUser, "DB_SERVER": utils.DBUrl, "DB_NAME": utils.DBName, "DB_PASSWORD": utils.DBPassword, "JWT_SECRET": utils.JwtSecret}
	for configName, configValue := range configs {
		if configValue == "" {
			log.Fatalf("Config %s has not been set", configName)
		}
	}
	adminUser := &entities.User{
		UserName: utils.AdminName,
		Password: utils.AdminPassword,
		Role:     entities.RoleAdmin,
	}
	_, err := service.CreateUser(adminUser)
	if err == utils.ErrUserExists {
		log.Println("Admin already exists in the database, not creating a new admin")
	}
	if err != nil && err != utils.ErrUserExists {
		log.Panicf("Unable to create admin, error: %s", err)
	}
}

func printVersion() {
	log.Info(fmt.Sprintf("Go Version: %s", runtime.Version()))
	log.Info(fmt.Sprintf("Go OS/Arch: %s/%s", runtime.GOOS, runtime.GOARCH))
}
