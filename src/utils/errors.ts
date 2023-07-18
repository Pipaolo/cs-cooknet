export const validationErrors = {
  required: "This field is required.",
  minLength: (length: number) =>
    `This field must be at least ${length} characters long.`,
  maxLength: (length: number) =>
    `This field must be at most ${length} characters long.`,
} as const;
