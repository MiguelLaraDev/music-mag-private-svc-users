import errors from "restify-errors";
import * as usersCtrl from "../controllers/users.controller.js";
import * as validation from "../validation/users.validation.js";
import { ERROR } from "../common/constants.js";

export default (server) => {
  server.post("/users", validation.add, async (req, res, next) => {
    const result = await usersCtrl.add(req.body);

    if (result.type === ERROR) {
      return next(new errors.InternalServerError(result.value));
    }

    res.send(201, result);
    return next();
  });

  server.del("/users/:user_id", async (req, res, next) => {
    const result = await usersCtrl.remove(req.params.user_id);

    if (result.type === ERROR) {
      return next(new errors.InternalServerError(result.value));
    }

    res.send(200, result);
    return next();
  });

  server.put("/users/:user_id", validation.update, async (req, res, next) => {
    const { user_id } = req.params;
    const result = await usersCtrl.update(user_id, req.body);

    if (result.type === ERROR) {
      return next(new errors.InternalServerError(result.value));
    }

    res.send(200, result);
    return next();
  });

  server.get("/users/:user_id", async (req, res, next) => {
    const result = await usersCtrl.findOneById(req.params.user_id);

    if (result.type === ERROR) {
      return next(new errors.InternalServerError(result.value));
    }

    res.send(200, result);
    return next();
  });

  server.get("/users", async (req, res, next) => {
    const result = await usersCtrl.findAll();

    if (result.type === ERROR) {
      return next(new errors.InternalServerError(result.value));
    }

    res.send(200, result);
    return next();
  });
};
