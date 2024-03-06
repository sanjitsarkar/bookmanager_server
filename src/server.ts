import app from "./app"
import config from "./config"
import initDB from "./config/initDB"
(async () => {
    await initDB()
    app.listen(config.PORT, () => {
        console.log(`Listenning on PORT:${config.PORT}`);
    })

})()