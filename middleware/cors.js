
export const cors = (req, res, next) => {
    if (req.headers.origin) {

      res.setHeader(
        "Access-Control-Allow-Origin",
        process.env.domain || req.headers.origin
      );
    }

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,Authorization,X-Requested-With,content-type,Accept"
    );

    res.setHeader("Access-Control-Allow-Credentials", true);
  
    if ("OPTIONS" === req.method) {
      return res.sendStatus(200);
    }
  
    return next(); 
  };