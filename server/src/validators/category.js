import { check } from 'express-validator';

exports.categoryCreateValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required')
]