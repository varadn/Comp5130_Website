import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),
];

export default eslintConfig;

// Taken from Next.js ESLint config documentation
// https://nextjs.org/docs/basic-features/eslint#customizing-eslint-configuration
