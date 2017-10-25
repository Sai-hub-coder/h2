/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

function addProcessExitHandlers() {
  // Issue: https://github.com/facebookincubator/create-react-app/issues/1753
  // The below lines are added to make sure that this process is
  // exited when stdin is ended. The consequence of not doing this means
  // that all watch processes will stay running despite the process that spawned
  // them being closed.
  process.stdin.on('end', function() {
    process.exit(0);
  });
  process.stdin.resume();
}

module.exports = addProcessExitHandlers;
