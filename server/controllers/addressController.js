import Address from '../models/address';

export const addAddress = async (req, res) => {
	try {
		const {
			fullName,
			phoneNo,
			pinNo,
			locality,
			landmark,
			phoneNo2,
			fullAddress,
			state,
		} = req.body;
		const newAddress = new Address({
			user: req.user._id,
			fullName,
			phoneNo,
			pinNo,
			locality,
			landmark,
			phoneNo2,
			fullAddress,
			state,
		});
		await newAddress.save();
		return res.json(newAddress);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal server error for adding address');
	}
};

export const updateAddress = async (req, res) => {
	try {
		const existAddress = await Address.findById(req.params.id);
		if (!existAddress) {
			return res.status(404).send('Address not found');
		}
		const {
			fullName,
			phoneNo,
			pinNo,
			locality,
			landmark,
			phoneNo2,
			fullAddress,
			state,
		} = req.body;
		existAddress.fullName = fullName;
		existAddress.phoneNo = phoneNo;
		existAddress.pinNo = pinNo;
		existAddress.locality = locality;
		existAddress.landmark = landmark;
		existAddress.phoneNo2 = phoneNo2;
		existAddress.fullAddress = fullAddress;
		existAddress.state = state;
		await existAddress.save();
		return res.json(existAddress);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal server error for updating address');
	}
};

export const deleteAddress = async (req, res) => {
	try {
		const existAddress = await Address.findById(req.params.id);
		if (!existAddress) {
			return res.status(404).send('Address not found');
		}
		await existAddress.remove();
		return res.json(existAddress);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal server error for deleting address');
	}
};

export const getAddress = async (req, res) => {
	try {
		const address = await Address.find({});
		return res.json(address);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal server error for getting address');
	}
};

export const getAddressesForAUser = async (req, res) => {
	try {
		const address = await Address.find({ user: req.user._id });
		return res.json(address);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal server error for getting addresses');
	}
};
