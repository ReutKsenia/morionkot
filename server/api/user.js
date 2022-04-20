const api = {};

api.userForgotPassword = (User) => (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if (!user) return res.status(400).send({message: 'email not in database'});
        const token = jwt.sign({ _id: user.id}, config.secret);
        User.findOneAndUpdate({"_id": user.id}, {
          resetPasswordToken: token,
          resetPasswordExpires: new Date(Date.now() + 3600000)
        }, {new: true}).then(user => {
           
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: config.emailAddress,
              pass: config.emailPass
            }
          })
    
          const mailOptions = {
            from: config.emailAddress,
            to: user.email,
            subject: 'Link to reset password',
            html:
              `<p>Вы получаете это сообщение, потому что вы (или кто-то другой) запросили сброс пароля для вашей учетной записи.</p>
              <p>Пожалуйста, нажмите на ссылку ниже или вставьте ее в свой браузер, чтобы завершить процесс в течение одного часа после получения:</p>
              <a href="${config.clientPort}/reset/${token}\">Click here</a>
              <p>Если вы не просили об этом, пожалуйста, проигнорируйте это письмо, и ваш пароль останется неизменным.</p>`
          };
    
          console.log('sending mail');
    
          transporter.sendMail(mailOptions, (err) => {
            if (err) console.error(err)
            else res.status(200).send({message:'email sent'});
          })
        })
      })
}

api.userResetPassword = (User) => (req, res) => {
    User.findOne({
        resetPasswordToken: req.body.resetPasswordToken,
        resetPasswordExpires: {$gt: new Date()}
      }).then(user => {
        if (!user) {
          res.status(404).send({message:'ссылка для сброса пароля недействительна или истек срок действия'});
        } else {
          User.updateOne({"_id": user.id}, {$set: { password: req.body.newPassword, 
            resetPasswordToken: null,
            resetPasswordExpires: null}}).then(() => {
            res.status(200).send({message:'пароль обновлён'})
          });
        }
      })
}

module.exports = api;