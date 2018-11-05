/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  defaultSeverity: 'warning',
  rulesDirectory: 'tslint-microsoft-contrib',
  rules: {
    // https://palantir.github.io/tslint/rules/
    'await-promise': true,
    'new-parens': true,
    'no-angle-bracket-type-assertion': true,
    'no-conditional-assignment': true,
    'no-debugger': true,
    'no-duplicate-super': true,
    'no-duplicate-switch-case': true,
    'no-duplicate-variable': true,
    'no-eval': true,
    'no-floating-promises': true,
    'no-for-in-array': true,
    'no-implicit-dependencies': [true, 'dev'],
    'no-invalid-template-strings': true,
    'no-invalid-this': true,
    'no-namespace': true,
    'no-sparse-arrays': true,
    'no-string-throw': true,
    'no-switch-case-fall-through': true,
    'no-unused-expression': [true, 'allow-fast-null-checks'],
    // DEPRECATED. Recommended to use TS 'noUnusedLocals' for now
    // "no-unused-variable": true,
    'triple-equals': true,
    'use-isnan': true,

    // https://github.com/Microsoft/tslint-microsoft-contrib
    'react-a11y-anchors': true,
    'react-a11y-aria-unsupported-elements': true,
    'react-a11y-event-has-role': true,
    'react-a11y-image-button-has-alt': true,
    'react-a11y-img-has-alt': true,
    'react-a11y-props': true,
    'react-a11y-proptypes': true,
    'react-a11y-role': true,
    'react-a11y-role-has-required-aria-props': true,
    'react-a11y-role-supports-aria-props': true,
  },
};
