import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  cohort: {
    create: Joi.object({
      max_hours: Joi.number().required(),
    }),
  },
  applicant: {
    create: Joi.object({
      cohort_id: Joi.number().required(),
      name: Joi.string().required().max(40),
      hours_needed: Joi.number().required(),
      earnings_potential: Joi.number().required(),
    }),
  },
  student: {
    create: Joi.object({
      cohort_id: Joi.number().required(),
      applicant_id: Joi.number().required(),
      name: Joi.string().required()
    })
  }
};
