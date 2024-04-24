// @ts-check
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
        ],
        tsconfigRootDir: import.meta.dirname,
        // projectFolderIgnoreList: ["app/chromium/walk_kix_app/"],
      },
    },
    // ignores: [
    //   "walk_kix_app/",
    //   "walk_kix_app/*",
    //   "walk_kix_app/**",
    //   "**/walk_kix_app/",
    //   "app/chromium/walk_kix_app/",
    //   "app/chromium/walk_kix_app/*",
    //   "app/chromium/walk_kix_app/*",
    //   "app/chromium/walk_kix_app/src/walk_kix_app.ts",
    // ],
  }
);
