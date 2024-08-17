import schema from "../utils/objectvalidation/Uservalid.js";
import schemaProduct from "../utils/objectvalidation/productvalid.js";
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

async function purchasesValidator(purchese) {
  try {
    const valideate  = await schemaProduct.validateAsync(purchese, { abortEarly: false });
    return valideate
  } catch (error) {
    // throw error
    return error
  }
};

export { uservalidator,purchasesValidator }