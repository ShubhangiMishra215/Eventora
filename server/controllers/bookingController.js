const Booking = require("../models/Bookings");
const OTP = require("../models/OTP");
const Event = require("../models/Event");
const { sendOtpEmail, sendBookingEmail } = require("../utils/email");

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("eventId", "title totalSeats availableSeats");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.sendBookingOTP = async (req, res) => {
  try {
    const otp = generateOtp();
    await OTP.findOneAndDelete({
      email: req.user.email,
      action: "event_booking",
    });
    await OTP.create({ email: req.user.email, otp, action: "event_booking" });
    await sendOtpEmail(req.user.email, otp, "event_booking");
    res.json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bookEvent = async (req, res) => {
  try {
    const { eventId, otp } = req.body;
    const otpRecord = await OTP.findOne({
      email: req.user.email,
      otp,
      action: "event_booking",
    });
    if (!otpRecord)
      return res.status(400).json({ error: "Invalid or expired OTP" });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });
    if (event.availableSeats <= 0)
      return res.status(400).json({ error: "No seats available" });

    const booking = await Booking.create({
      userId: req.user._id,
      eventId: eventId,
      status: "pending",
      paymentStatus: "not_paid",
      amount: event.ticketPrice,
    });

    await OTP.findByIdAndDelete(otpRecord._id);
    res.json({
      message: "Booking successful. Please proceed to payment.",
      bookingId: booking._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.confirmBooking = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    console.log("paymentStatus received:", paymentStatus);
    console.log("bookingId:", req.params.bookingId);
    if (!["paid", "not_paid"].includes(paymentStatus)) {
      return res.status(400).json({ error: "Invalid payment status" });
    }

    const booking = await Booking.findById(req.params.bookingId).populate(
      "eventId",
    );
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    if (booking.status === "confirmed")
      return res.status(400).json({ error: "Booking already confirmed" });

    const event = await Event.findById(booking.eventId._id);
    if (event.availableSeats <= 0)
      return res.status(400).json({ error: "No seats available" });

    booking.status = "confirmed";
    booking.paymentStatus = paymentStatus;
    await booking.save();

    event.availableSeats -= 1;
    await event.save();

    try {
      const fullBooking = await Booking.findById(booking._id).populate(
        "userId",
        "email",
      );
      await sendBookingEmail(
        fullBooking.userId.email,
        event.title,
        booking._id,
      );
    } catch (emailErr) {
      console.error("Email failed:", emailErr.message);
    }

    res.json({ message: "Booking confirmed", bookingId: booking._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate(
      "eventId",
    );
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    // fix: allow admin OR the booking owner
    if (
      req.user.role !== "admin" &&
      booking.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const wasConfirmed = booking.status === "confirmed";
    booking.status = "cancelled";
    await booking.save();

    if (wasConfirmed) {
      const event = await Event.findById(booking.eventId);
      if (event) {
        event.availableSeats += 1;
        await event.save();
      }
    }
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
