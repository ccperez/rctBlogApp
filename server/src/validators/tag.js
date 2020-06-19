import { check } from 'express-validator';

exports.createTagValidator = [
	check('name')
		.not()
		.isEmpty()
		.withMessage('Name is required')
];