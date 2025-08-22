import User from '../models/user.js'; 

export const editAddress = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const { id } = req.user

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    await User.updateOne(
      { _id: id },
      {
        $set: {
          shippingAddress: {
            address: shippingAddress.address,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country,
          },
        },
      }
    );

    return res.status(200).json({ message: "Shipping address updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};