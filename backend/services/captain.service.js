const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({ 
  firstName, lastName, email, password, phoneNumber,  vehicleCapacity , vehicleType , vehiclePlate , vehicleModel , vehicleColor }) => {

    try {
        if (!firstName || !email || !password || !phoneNumber || !vehicleCapacity ||  !vehicleType || !vehiclePlate || !vehicleModel || !vehicleColor ) throw new Error("Please provide all the fields");

        const captain = await captainModel.create({
            name: { firstName, lastName },
            email,
            password,
            phoneNumber,
            vehicle : {
                capacity : vehicleCapacity,
                type : vehicleType,
                plate : vehiclePlate,
                model : vehicleModel,
                color : vehicleColor
            }
        });
        return captain;
    } catch (err) {
        console.log(err);
    }
}

