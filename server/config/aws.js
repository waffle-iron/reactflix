let AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('Q').Promise);
