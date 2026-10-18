const Trip = require('../models/travlr');

const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode }).exec();
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const tripsAddTrip = async (req, res) => {
    try {
        const trip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        const saved = await trip.save();
        return res.status(201).json(saved);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const tripsUpdateTrip = async (req, res) => {
    try {
        const updated = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true, runValidators: true }
        ).exec();
        if (!updated) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        return res.status(200).json(updated);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const tripsByResort = async (req, res) => {
    try {
        const report = await Trip.aggregate([
            { $group: { _id: '$resort', tripCount: { $sum: 1 } } },
            { $sort: { tripCount: -1 } }
        ]);
        return res.status(200).json(report);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsByResort
};