const {Router} = require('express')
const router = Router()


const {Login,Logout} = require('../controllers/admin')

router.route('/login').post(Login)
router.route('/logout').post(Logout)





module.exports = router