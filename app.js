import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import logger from 'morgan';

import indexRouter from './routes/index';
import questionRouter from './routes/question';

const app = express();

// middleware
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

// route
app.use('/api/v1/', indexRouter);
app.use('/api/v1/question', questionRouter)

// entry point
app.get('/', (req, res)=>{
  res.status(200).json({
    status: 200,
    message: 'Welcome to CBT Offline v1'
  })
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  res.status(err.status || 500).json({
    status: err.status || 500,
    error : req.app.get('env') === 'development' ? err : {}
  })
});

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Listening to port ${port}`));

export default app;
