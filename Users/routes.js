import * as dao from "./dao.js";
export default function UserRoutes(app) {
    let globalUser = null;
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };

    // const findAllUsers = async (req, res) => {
    //     const { role } = req.query;
    //     if (role) {
    //         const users = await dao.findUsersByRole(role);
    //         res.json(users);
    //         return;
    //     }
    //     const users = await dao.findAllUsers();
    //     res.json(users);
    // };
    const findAllUsers = async (req, res) => {
        try {
            const { role } = req.query;
            let users;
            if (role) {
                users = await dao.findUsersByRole(role);
            } else {
                users = await dao.findAllUsers();
            }
            res.json(users);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "An error occurred while finding the users." });
        }
    };
    app.get("/api/users", findAllUsers);
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };

    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        //currentUser = await dao.findUserById(userId);
        res.json(status);
    };

    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
            return;
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        globalUser = currentUser;
        res.json(currentUser);
    };


    // const signup = async (req, res) => {
    //     const { username } = req.body;
    //     console.log("user");
    //     try {
    //         const user = await dao.findUserByUsername(req.body.username);
    //         console.log("user" + user);
    //        if(user){
    //            return res.status(400).json({ message: "Username already exists. Please choose a different username." });
    //        }
    //         const currentUser = await dao.createUser(req.body);
    //             req.session["currentUser"] = currentUser;
    //             globalUser = currentUser;
    //             res.json(currentUser);
    //     } catch  (e) {
    //         console.error(e);
    //         if (e.code === 11000) {
    //             return res.status(400).json({ message: "Username already exists. Please choose a different username." });
    //         }
    //         res.status(500).json({ message: "An error occurred. Please try again later." });
    //     }
    // };
    app.post("/api/users/signup", signup);


    // const signin = async (req, res) => {
    //     const {  username, password } = req.body;
    //     const currentUser = await dao.findUserByCredentials(username, password);
    //    if(currentUser){
    //        req.session["currentUser"] = currentUser;
    //        globalUser = currentUser;
    //        res.json(currentUser);
    //      } else {
    //        res.status(401).json({ message: "Invalid username or password." });
    //    }
    // };

    const signin = async (req, res) => {
        const { username, password } = req.body;
        console.log("Received login request with username:", username);
        console.log("Received login request with password:", password);
        const currentUser = await dao.findUserByCredentials(username, password);
        console.log("Current user:", currentUser);
        if (currentUser!==null) {
            req.session["currentUser"] = currentUser;
            globalUser = currentUser;
            res.json(currentUser);
        } else {
            console.log("Invalid username or password.");
            res.status(401).json({ message: "Invalid username or password." });
        }
    };





    const signout = (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destruction error:', err);
                return res.status(500).json({ success: false, message: 'Internal server error during signout.' });
            }
            res.status(200).json({ success: true, message: 'Successfully signed out.' });
            globalUser = null;
        });
    };

    const profile = (req, res) => {
        let currentUser = req.session["currentUser"];
        currentUser = globalUser;
        console.log("profile" + currentUser);
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };

    // const checkUsernames = async (req, res) => {
    //     const { username } = req.body;
    //     const user = await dao.findUserByUsername(username);
    //     res.json({ exists: !!user });
    // };
    // app.get("/api/users/signup/check", checkUsernames);


    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);

    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile );
}
