eslint-plugin-copyright
====================

ESLint plugin to ensure that files begin with given copyright comment.

## Usage

This rule takes 1 argument.
It is an array of each line of the comment.

```json
{
    "plugins": [
        "copyright"
    ],
    "rules": {
        "copyright/copyright": [
            2,
            [
                '***********************',
                '* Copyright BLA, 2017 *',
                '***********************'
            ]
        ]
    }
}
```
This rule can be used with the eslint --fix option. If the copyright comment is not found, it will be added.
If the copyright comment is present but not at the very begining of the file, the fixer will place it on the top.

Valid copyright header for the above format
```javascript
/*
***********************
* Copyright BLA, 2017 *
***********************
*/
console.info(1)
```

Currently the following format is not supported
```javascript
/* Copyright BLA, 2017 */
console.info(1)
```

## License

MIT
