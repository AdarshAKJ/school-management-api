import { db } from "../connect.js";

export const addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Basic validation
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        //
        const q = "INSERT INTO schools(`name`, `address`,`latitude`, `longitude`) VALUES(?)"

        const values = [name, address, latitude, longitude];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json({
                message: "User has been created."
            });
        });

    } catch (error) {
        res.status(500).json({ error: 'Database error', details: error });
    }
}

export const listSchools = async (req, res) => {
    const { latitude, longitude } = req.params;

    // Basic validation
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const q = "SELECT * FROM schools";

        db.query(q, [], (err, schools) => {
            if (err) return res.status(500).json({ error: 'Database error', details: err });

            // Calculate distance using Haversine formula
            const schoolsWithDistance = schools.map(school => {
                const distance = calculateDistance(latitude, longitude, school.latitude, school.longitude);
                return { ...school, distance };
            });

            // Sort by distance
            schoolsWithDistance.sort((a, b) => a.distance - b.distance);

            return res.status(200).json(schoolsWithDistance);
        });
    } catch (error) {
        res.status(500).json({ error: 'Unexpected error', details: error });
    }
};


function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}
