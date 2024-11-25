import User from "../model/user.model.js";

export const getUserForsideBar = async (req, res) => {
  try {
    const logedInuserId = req.user._id;

    const filteredusers = await User.find({
      _id: { $ne: logedInuserId },
    }).select("-password");
    res.status(200).json({ users: filteredusers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const followUser = async (req, res) => {
  // const { id } = req.params; // ID of the user to be followed
  const { currentUserId, id } = req.body; // ID of the current user (follower)

  try {
    const userToFollow = await User.findById(id); // The user to be followed
    const currentUser = await User.findById(currentUserId); // The current user

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already following
    if (userToFollow.followers.includes(currentUserId)) {
      currentUser.followers.push(userToFollow); // Add the current user to the followers array
      // Add the current user to the followers array
      await currentUser.save();
      return res.status(200).json({ message: "Already following this user" });
    }

    // Simulate sending a follow request
    // In a real-world app, you'd send notifications or follow request logic here
    currentUser.followers.push(userToFollow); // Add the current user to the followers array
    // Add the current user to the followers array
    await currentUser.save();

    res.status(200).json({ message: "Follow request sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const followedUsers = async (req, res) => {
  const { currentUserId } = req.body; // ID of the current logged-in user

  try {
    // Fetch the current logged-in user
    const currentUser = await User.findById(currentUserId).populate(
      "followers"
    );

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all users followed by the current user
    const followedUsers = await User.find({
      _id: { $in: currentUser.followers },
    });

    res.status(200).json({ users: followedUsers }); // Return followed users
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
