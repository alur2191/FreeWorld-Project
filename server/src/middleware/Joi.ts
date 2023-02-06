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

let applicant = Joi.object().keys({
  name: Joi.string().required().max(40),
  hours_needed: Joi.number().required(),
  earnings_potential: Joi.number().required(),
})

let student = Joi.object().keys({
  cohort_id: Joi.number().required(),
  applicant_id: Joi.number().required(),
  name: Joi.string().required()
})

export const Schemas = {
  cohort: {
    create: Joi.object({
      max_hours: Joi.number().required(),
      max_earnings: Joi.number().required(),
      considered: Joi.number().required(),
    }),
  },
  applicant: {
    create: Joi.object({
      cohort_id: Joi.number().required(),
      applicants: Joi.array().items(applicant)
    }),
  },
  student: {
    create: Joi.object({
      studentsList: Joi.array().items(student)
    })
  }
};
