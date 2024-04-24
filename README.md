# About

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the project :

First run `npm install` to install the dependencies.

Run `npm run lint`, you will see the following error :

```error
  1:69  error  'e' is defined but never used                            @typescript-eslint/no-unused-vars
  2:7   error  'custom_event' is never reassigned. Use 'const' instead  prefer-const

✖ 2 problems (2 errors, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

However, you should not see these errors as the related file is normally ignored. If you specify the ignore pattern on the cli, you will get the expected result.

To try it out, simply run :

```
npm run lint:ok
```
