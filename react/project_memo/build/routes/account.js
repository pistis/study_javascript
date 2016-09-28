'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/signup', function (req, res) {
    res.json({ success: true });
});

router.post('/signin', function (req, res) {
    res.json({ success: true });
});

router.get('/getinfo', function (req, res) {
    res.json({ info: null });
});

router.post('/logout', function (req, res) {
    return res.json({ success: true });
});

exports.default = router;