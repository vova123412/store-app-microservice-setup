import schema from "../objectvalidation/Uservalid.js";
async function uservalidator(req, res, next) {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).json({
        error: error.details.map(err => err.message)
      });
    }
  };

export { uservalidator }