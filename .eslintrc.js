module.exports = {
    extends: ['react-app', 'airbnb', 'plugin:prettier/recommended', 'prettier/react'],
    settings: {
        'import/resolver': {
            node: {
                paths: ['src/'],
            },
        },
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'no-plusplus': 'off',
        'no-param-reassign': 'off',
        'arrow-body-style': 'off',
        'no-underscore-dangle': 'off',
        'import/prefer-default-export': 'off',
        'prefer-arrow-callback': 'error',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
    },
};
