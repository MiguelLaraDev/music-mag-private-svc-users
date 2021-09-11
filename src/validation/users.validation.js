import Joi from "joi";
import errors from "restify-errors";

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  role: Joi.string().valid(...["root", "admin", "editor"]),
  photo: Joi.string().pattern(new RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  date_created: Joi.string().min(0),
  date_updated: Joi.string().min(0),
});

export const add = (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    next(new errors.PreconditionFailedError(result.error));
  } else {
    next();
  }
};

export const update = (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    next(new errors.PreconditionFailedError(result.error));
  } else {
    next();
  }
};
