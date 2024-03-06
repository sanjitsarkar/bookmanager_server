import app from "./app"
import config from "./config"
import initDB from "./config/initDB"
(async () => {
    app.listen(config.PORT, async () => {
        console.log(`Listening on PORT:${config.PORT}`);
        await initDB()
    })

})()