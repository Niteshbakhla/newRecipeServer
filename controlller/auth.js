const User = require("../Schema/schema")
const bcrypt = require("bcrypt")


exports.signup = async (req, res) => {
            console.log("hey")
            try {
                        const { username, email, password } = req.body;
                        const isEmailExist = await User.findOne({ email })
                        if (isEmailExist) {
                                    return res.status(404).json({ success: false, message: "Email is already exist", email })
                        }

                        const hashpassword = await bcrypt.hash(password, 12)

                        const user = new User({ username, email, password: hashpassword });
                        await user.save();
                        return res.status(201).json({ success: true, message: 'User created successfully', user });
            } catch (error) {
                        console.error(error);
                        return res.status(500).json({ error: 'Internal server error' });
            }
}


exports.login = async (req, res) => {
            try {
                        const { email, password } = req.body;
                        const user = await User.findOne({ email });
                        if (!user) {
                                    return res.status(401).json({ error: 'Invalid email or password' });
                        }
                        const isMatch = await bcrypt.compare(password, user.password);
                        if (!isMatch) {
                                    return res.status(401).json({ error: 'Invalid email or password' });
                        }
                        res.status(200).json({ success: true, message: 'Login successful' });
            } catch (error) {
                        console.error(error);
                        res.status(500).json({ error: 'Internal server error' });
            }
}