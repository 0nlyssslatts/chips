import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import i18next from "eslint-plugin-i18next";

export default [
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.jest,
            },
            ecmaVersion: 2020,
            sourceType: "module",
            parserOptions: {
                projectService: true,
                tsconfigRootDir: resolve(dirname(fileURLToPath(import.meta.url))),
            },
        },
        rules: {},
    },
    ...tseslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    js.configs.recommended,
    pluginReact.configs.flat.recommended,
    i18next.configs["flat/recommended"],

    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        plugins: {
            prettier: pluginPrettier,
        },
        rules: {
            "prettier/prettier": [
                "warn",
                {
                    semi: true,
                    singleQuote: false,
                    jsxSingleQuote: false,
                    printWidth: 100,
                    tabWidth: 4,
                    trailingComma: "es5",
                    endOfLine: "auto",
                },
            ],
        },
    },
    {
        ignores: ["dist/**/*", "node_modules/**/*"],
    },

    {
        rules: {
            // Чистый код и читаемость
            "no-console": ["warn"], // предупреждение на console.log
            "prefer-const": ["error"], // если переменная не меняется — должна быть const
            "no-var": ["error"], // запрет использования var
            "prefer-template": ["error"], // использовать шаблонные строки вместо конкатенации
            "no-unused-vars": ["warn"], // предупреждать о неиспользуемых переменных
            "no-debugger": ["error"], // запрет на использование debugger
            "no-empty": ["warn"], // предупреждение на пустые блоки if/for

            // TypeScript
            "@typescript-eslint/no-explicit-any": ["error"], // запрет на использование any
            "@typescript-eslint/no-non-null-assertion": ["error"], // запрет на !
            "@typescript-eslint/no-unnecessary-type-assertion": ["warn"],
            "@typescript-eslint/no-floating-promises": ["off"], // обязательно await или .catch()
            "@typescript-eslint/no-misused-promises": ["off"], // не использовать промисы без await
            "@typescript-eslint/no-unsafe-member-access": ["warn"], // доступ к полям объекта без type-checking
            "@typescript-eslint/no-unsafe-call": ["error"], // вызов чего-то, что может не быть функцией
            "@typescript-eslint/restrict-plus-operands": ["error"], // запрет на + между неизвестными типами

            //React
            "react/react-in-jsx-scope": "off", // не требуется в React 17+
            "react/jsx-uses-react": "off", // тоже не нужно с новыми версиями
            "react/jsx-uses-vars": ["error"], // переменная не используется в JSX
            "react/function-component-definition": [
                "error",
                {
                    namedComponents: "arrow-function",
                    unnamedComponents: "arrow-function",
                },
            ],
            "react/jsx-no-useless-fragment": ["warn"], // не использовать <></> без причины
            "react/jsx-key": ["error"], // всегда указывать key в списках
            "react/self-closing-comp": ["warn"], // компоненты без дочерних элементов должны быть самозакрывающимися
            "react/no-unescaped-entities": ["warn"], // безопасные символы в JSX
            "react/no-deprecated": ["warn"],
        },
    },
];
