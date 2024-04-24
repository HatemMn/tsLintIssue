import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: [
          "./app/mySecondApp/tsconfig.json",
          "./app/myFirstApp/tsconfig.json",
          "./tsconfig.eslint.json",
        ],
        tsconfigRootDir: import.meta.dirname,
        projectFolderIgnoreList: ["app/myFirstApp/nestedProject/"],
      },
    },
    ignores: ["app/myFirstApp/nestedProject/"],
  }
);
