import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)
    app.use(cookieParser());
    app.use(cors({
        credentials: true,
        origin: [process.env.CLIENT_URL]
    }));

    const config = new DocumentBuilder()
        .setTitle('The bank')
        .setDescription('Документація API')
        .setVersion('1.0.0')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
}

start()