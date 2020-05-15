const express = require('express');
const router = express.Router();
const auth = require('../api/auth');
const Admin = require('../models/admin');

router.post('/auth', auth.login(Admin));

module.exports = router;

// module.exports = (app) => {
//     app.route('/auth')
//        .post(api.login(Admin));
//   }