const { z } = require('zod');

exports.signupSchema = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: 'Name is required' })
        .min(1, 'Name cannot be empty'),
      email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format'),
      password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters long'),
      passwordConfirm: z.string({
        required_error: 'Please confirm your password',
      }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ['passwordConfirm'],
    }),
});

exports.loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(1, 'Password cannot be empty'),
  }),
});

exports.forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
  }),
});

exports.resetPasswordSchema = z.object({
  body: z
    .object({
      password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters long'),
      passwordConfirm: z.string({
        required_error: 'Please confirm your password',
      }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ['passwordConfirm'],
    }),
  params: z.object({
    token: z.string({
      required_error: 'Reset token is required in URL parameters',
    }),
  }),
});

exports.updatePasswordSchema = z.object({
  body: z
    .object({
      passwordCurrent: z
        .string({ required_error: 'Current password is required' })
        .min(1, 'Current password cannot be empty'),
      password: z
        .string({ required_error: 'New password is required' })
        .min(8, 'Password must be at least 8 characters long'),
      passwordConfirm: z.string({
        required_error: 'Please confirm your password',
      }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ['passwordConfirm'],
    }),
});

exports.updateMeSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name cannot be empty').optional(),
    email: z.string().email('Invalid email format').optional(),
  }),
});

exports.googleLoginSchema = z.object({
  body: z.object({
    idToken: z.string({ required_error: 'Google ID token is required' }),
  }),
});
