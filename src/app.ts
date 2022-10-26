import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/error';
import router from './routes/indexRouter';

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);

export default app;
