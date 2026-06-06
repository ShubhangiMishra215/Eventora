const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
    bookEvent,
    sendBookingOTP,
    getMyBookings,
    getAllBookings,
    confirmBooking,
    cancelBooking
} = require('../controllers/bookingController');

router.post('/send-otp', protect, sendBookingOTP);
router.post('/', protect, bookEvent);
router.get('/all', protect, admin, getAllBookings);
router.get('/my', protect, getMyBookings);
router.put('/:bookingId/confirm', protect, admin, confirmBooking);
router.delete('/:bookingId', protect, cancelBooking);

module.exports = router;