import formidable from 'formidable';
import slugify 		from 'slugify';
import stripHtml 	from 'string-strip-html';
import _ 					from 'lodash';
import fs 				from 'fs';

import Blog 			from '../models/blog';
import Category 	from '../models/category';
import Tag 				from '../models/tag';

import { errorHandler } from '../helpers/dbErrorHandler';
import { smartTrim } from '../helpers/blog';

exports.create = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: 'Image could not upload'
			});
		}

		const { title, body, categories, tags } = fields;

		if (!title ||  !title.length) {
			return res.status(400). json({
				error: 'title is required'
			});
		}
		if (!body || body.length < 200) {
			return res.status(400).json({
				error: 'Content is too short'
			});
		}

		if (!categories || categories.length === 0) {
			return res.status(400).json({
				error: 'At least one category is required'
			});
		}

		if (!tags || tags.length === 0) {
			return res.status(400).json({
				error: 'At least one tag is required'
			})
		}

		let blog = new Blog();
		blog.title 		= title;
		blog.body 		= body;
		blog.except 	= smartTrim(body, 320, ' ', ' ...')
		blog.excerpt 	= smartTrim(body, 320, ' ', ' ...');
		blog.slug 		= slugify(title).toLowerCase();
		blog.mtitle 	= `${title} | ${process.env.APP_NAME}`;
		blog.mdesc 		= stripHtml(body.substring(0, 160));
		blog.postedBy = req.user._id;
		// categories and tags
		let arrayofCategories = categories && categories.split(',');
		let arrayofTags = tags && tags.split(',')

		if (files.photo) {
			if (files.photo.size > 10000000) {
				return res.status(400).json({
					error: 'Image should be less then 1mb in size'
				});
			}
			blog.photo.data = fs.readFileSync(files.photo.path);
			blog.photo.contentType = files.photo.type;
		}

		blog.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err)
				});
			}
			// res.json(result);
			Blog.findByIdAndUpdate(result._id, { $push: { categories: arrayOfCategories } }, { new: true }).exec(
				(err, result) => {
					if (err) {
						return res.status(400).json({
							error: errorHandler(err)
						});
					} else {
						Blog.findByIdAndUpdate(result._id, { $push: { tags: arrayOfTags } }, { new: true }).exec(
							(err, result) => {
								if (err) {
									return res.status(400).json({
										error: errorHandler(err)
									});
								} else {
									res.json(result);
								}
							}
						);
					}
				}
			);
		});
	});
};
