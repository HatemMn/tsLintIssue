// config where I do not typescript-eslint

import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    // If you comment the line below, you will get an (expected) linting error
    ignores: ["app/myFirstApp/nestedProject/src/"],
  },
];
