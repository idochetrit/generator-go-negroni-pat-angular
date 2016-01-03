package main


import (
    "fmt"
    "log"
    "log/syslog"
    "net/http"
    "time"

    "os"

    "github.com/bmizerany/pat"
    "github.com/codegangsta/negroni"
    gtcore "github.com/gtforge/libgtcore"
    "github.com/spf13/viper"
    "gopkg.in/airbrake/gobrake.v1"
)

var Settings map[string]*viper.Viper
var environments string

func newServer() *http.Server {
    n := negroni.New()

    // Middlewares
    if Settings["environments"].GetBool("log") {
        n.Use(negroni.NewLogger())
    }

    n.UseFunc(recovery())

    // Setup routes
    router := pat.New()
    //router.Post("/api/v1/<resource>", http.HandlerFunc(/*handle func*/))

    // Add alive endpoint
    // router.Get("/alive", http.HandlerFunc(alive))
    // Add the router action
    n.UseHandler(router)
    Server := &http.Server{
        Addr:           ":" + Settings["environments"].GetString("server.port"),
        Handler:        n,
        ReadTimeout:    5 * time.Second,
        WriteTimeout:   5 * time.Second,
        MaxHeaderBytes: 1 << 20,
    }
    return Server
}

func InitConfigs() {
    environments = os.Getenv("ENV")
    if environments == "" {
        environments = "development"
    }
    Settings = make(map[string]*viper.Viper)
    Settings["environments"] = viper.New()
    Settings["environments"].SetConfigType("yml")
    Settings["environments"].AddConfigPath("config/environments")
    Settings["environments"].SetConfigName(environments)
    err := Settings["environments"].ReadInConfig()
    if err != nil {
        fmt.Errorf("Fatal error config file: %s \n", err)
    }
    settingsName := []string{kinesis, "base", influxdb, carbon, "secrets", statsd, newrelic, mixpanel}
    for _, name := range settingsName {
        Settings[name] = getSettings(name)
    }
}

func main() {
    InitConfigs()
    InitApp()
    Server := newServer()
    log.Printf("Start serving on %s", Server.Addr)
    log.Println(Server.ListenAndServe())
}

func InitApp() {
    // add here plugins and middleware
}

func appLogger(level string) gtcore.GTLogger {
    //Syslog
    lvl := syslog.LOG_INFO
    switch level {
    case `debug`:
        lvl = syslog.LOG_DEBUG
    case `warning`:
        lvl = syslog.LOG_WARNING
    case `error`:
        lvl = syslog.LOG_ERR
    }
    logWriter := log.New(os.Stdout, "WebService: ", log.LstdFlags)
    return &gtcore.ConsoleLogger{Level: lvl, Writer: logWriter}
}