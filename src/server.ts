import app from "./app"
import config from "./config"
import initDB from "./config/initDB"
(async () => {
    await initDB()
    app.listen(config.PORT, () => {
        console.log(`Listening on PORT:${config.PORT}`);
    })

})()