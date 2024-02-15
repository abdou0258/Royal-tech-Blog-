const {Router} = require('express')
const router = Router()


const {AddSubscriber} = require('../controllers/subscribe')



router.route('/').post(AddSubscriber)




module.exports = router