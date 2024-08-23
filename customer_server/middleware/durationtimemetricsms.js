

const promDurationTimems = (requestDurationHistogram)=> {
return (req, res, next) => {
    const start = Date.now() 
    console.log("start " + start)
    res.on('finish',() => {
      const responseTimeInMs = (Date.now() - start)/1000;
        requestDurationHistogram.labels(req.method,req.originalUrl, res.statusCode).observe(responseTimeInMs)
      console.log("end " + Date.now())
      console.log("finish duration " + responseTimeInMs)
    })
    return next()
  };    
  }
  export {promDurationTimems }