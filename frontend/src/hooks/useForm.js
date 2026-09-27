import { useState } from 'react';
import { parseError } from '@/lib/api';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validators: each returns an error string or undefined. */
export const rules = {
  required: (label) => (v) => (!v || !String(v).trim() ? `${label} is required` : undefined),
  email: () => (v) => (v && !EMAIL.test(v) ? 'Enter a valid email address' : undefined),
  min: (n, label) => (v) => (v && String(v).trim().length < n ? `${label} must be at least ${n} characters` : undefined),
  phone: () => (v) => (v && !/^[+\d\s()-]{7,20}$/.test(v) ? 'Enter a valid phone number' : undefined),
  match: (other, message) => (v, values) => (v !== values[other] ? message : undefined),
};

/**
 * Small form helper: values, field errors, client validation, submit + server error mapping.
 * schema: { field: [validator, ...] }
 */
export function useForm(initial, schema = {}) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const validateField = (name, value, all) => {
    for (const check of schema[name] || []) {
      const msg = check(value, all);
      if (msg) return msg;
    }
    return undefined;
  };

  const onChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const next = type === 'checkbox' ? checked : type === 'file' ? files?.[0] || null : value;
    setValues((v) => ({ ...v, [name]: next }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    const msg = validateField(name, values[name], values);
    setErrors((er) => ({ ...er, [name]: msg }));
  };

  const validateAll = () => {
    const next = {};
    for (const name of Object.keys(schema)) {
      const msg = validateField(name, values[name], values);
      if (msg) next[name] = msg;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (fn) => async (e) => {
    e?.preventDefault();
    setFormError('');
    if (!validateAll()) {
      setFormError('Please fix the highlighted fields.');
      return;
    }
    setSubmitting(true);
    try {
      await fn(values);
    } catch (err) {
      const parsed = parseError(err);
      setErrors((er) => ({ ...er, ...parsed.fields }));
      setFormError(parsed.message);
    } finally {
      setSubmitting(false);
    }
  };

  const field = (name) => ({ name, value: values[name] ?? '', onChange, onBlur, error: errors[name] });

  return { values, setValues, errors, setErrors, submitting, formError, setFormError, field, onChange, handleSubmit, reset: () => setValues(initial) };
}
