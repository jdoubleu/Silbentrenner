module.exports = {
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module'
    },
    env: {
        es6: true,
        browser: true
    },
    plugins: [
        'svelte3'
    ],
    overrides: [
        {
            files: '*.svelte',
            processor: 'svelte3/svelte3'
        }
    ],
    rules: {
        'no-console': 'error',
        'no-debugger': 'error',
        'space-before-function-paren': [
            'error',
            {
                'anonymous': 'never',
                'named': 'never',
                'asyncArrow': 'always'
            }
        ]
    },
};
