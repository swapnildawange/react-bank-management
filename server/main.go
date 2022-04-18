package main

import (
	"context"
	"database/sql"
	"flag"
	"fmt"
	"go_bank_app/config"
	"net/http"
	"os"

	accountservice "go_bank_app/accountService"

	"github.com/go-kit/log"
	"github.com/go-kit/log/level"
)

const dbsource = "postgresql://postgres:postgres@localhost:5432/gokitexample?sslmode=disable"

func main() {

	config.Load()
	var httpAddr = flag.String("http", ":8080", "http listen address")
	var logger log.Logger
	{
		logger = log.NewLogfmtLogger(os.Stderr)
		logger = log.NewSyncLogger(logger)
		logger = log.With(logger,
			"service", "account",
			"time:", log.DefaultTimestampUTC,
			"caller", log.DefaultCaller,
		)
	}

	level.Info(logger).Log("msg", "service started")
	defer level.Info(logger).Log("msg", "service ended")

	var db *sql.DB
	{
		var err error

		db, err = sql.Open("postgres", dbsource)
		if err != nil {
			level.Error(logger).Log("exit", err)
			os.Exit(-1)
		}

	}
	flag.Parse()
	ctx := context.Background()
	var srv accountservice.Service

	{
		dl := accountservice.NewDL(db, logger)

		srv = accountservice.NewBL(dl, logger)
	}

	errs := make(chan error)

	endpoints := accountservice.MakeAccountEndpoints(srv)

	go func() {
		fmt.Println("listening on port", *httpAddr)
		handler := accountservice.NewHTTPHandler(ctx, endpoints)
		errs <- http.ListenAndServe(*httpAddr, handler)
	}()

	level.Error(logger).Log("exit", <-errs)
}

// 	cliApp := cli.NewApp()
// 	cliApp.Name = config.AppName()
// 	cliApp.Version = "1.0.0"
// 	cliApp.Commands = []*cli.Command{
// 		{
// 			Name:  "start",
// 			Usage: "start server",
// 			Action: func(c *cli.Context) error {
// 				return startApp()
// 			},
// 		},
// 		{
// 			Name:  "create_migration",
// 			Usage: "create migration file",
// 			Action: func(c *cli.Context) error {
// 				return db.CreateMigrationFile(c.Args().Get(0))
// 			},
// 		},
// 		{
// 			Name:  "migrate",
// 			Usage: "run db migrations",
// 			Action: func(c *cli.Context) error {
// 				return db.RunMigrations()
// 			},
// 		},
// 		{
// 			Name:  "rollback",
// 			Usage: "rollback migrations",
// 			Action: func(c *cli.Context) error {
// 				return db.RollbackMigrations(c.Args().Get(0))
// 			},
// 		},
// 	}

// 	if err := cliApp.Run(os.Args); err != nil {
// 		panic(err)
// 	}
// }

// func startApp() (err error) {
// 	store, err := db.Init()
// 	if err != nil {
// 		logger.WithField("err", err.Error()).Error("Database init failed")
// 		return
// 	}

// 	deps := service.Dependencies{
// 		Store:      store,
// 		JWTService: helpers.NewJWTService(),
// 	}

// 	// mux router
// 	router := service.InitRouter(deps)

// 	// init web server
// 	server := negroni.Classic()
// 	server.UseHandler(router)

// 	port := config.AppPort() // This can be changed to the service port number via environment variable.
// 	addr := fmt.Sprintf(":%s", strconv.Itoa(port))

// 	server.Run(addr)
// 	return
// }
