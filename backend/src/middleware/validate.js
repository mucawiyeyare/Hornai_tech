import { HttpError } from '../utils/asyncHandler.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Minimal declarative validator.
 * rules: { field: { required, email, min, max, oneOf, label } }
 */
export const validate = (rules) => (req, _res, next) => {
  const errors = {};
  for (const [field, rule] of Object.entries(rules)) {
    const raw = req.body[field];
    const value = typeof raw === 'string' ? raw.trim() : raw;
    const label = rule.label || field;
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors[field] = `${label} is required`;
      continue;
    }
    if (value === undefined || value === '') continue;
    if (rule.email && !EMAIL.test(value)) errors[field] = 'Enter a valid email address';
    else if (rule.min && String(value).length < rule.min) errors[field] = `${label} must be at least ${rule.min} characters`;
    else if (rule.max && String(value).length > rule.max) errors[field] = `${label} must be at most ${rule.max} characters`;
    else if (rule.oneOf && !rule.oneOf.includes(value)) errors[field] = `${label} is not a valid option`;
    if (typeof raw === 'string') req.body[field] = value;
  }
  if (Object.keys(errors).length) return next(new HttpError(422, 'Please check the highlighted fields', errors));
  next();
};
