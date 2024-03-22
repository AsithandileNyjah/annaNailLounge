import {addUser, getUsers, getUser, editUser, delUser , addService, getServices, getService, editService, delServ, addBlog, getBlogs, getBlog, editBlog, delBlog, login, addRev, getRevs, getRev, delRev,addComment, getComments, revDisplay, commDisplay, makeApp, getApps, getApp, adminRights} from '../models/database.js'
import {authMiddleware } from '../middleware/middleware.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {pool} from '../config/config.js'
import { config } from 'dotenv'
config()

const addOne = async (req, res) => {
    const { firstName, lastName, emailAdd, username, userPass } = req.body;

    try {
        // Hash the password
        const hash = await bcrypt.hash(userPass, 10);

        // Add user to the database
        await addUser(firstName, lastName, emailAdd, username, hash);

        res.send({
            msg: "You have created an account"
        });
    } catch (error) {
        console.error("Error creating user:", error);
        
        // Check if the error indicates that the username or email already exists
        if (error.message.includes("User with the provided email or username already exists")) {
            res.status(400).send({
                error: "Username or email address already exists"
            });
        } else {
            res.status(500).send({
                error: "An error occurred while creating the user."
            });
        }
    }
    console.log('Error in code');
};

const getAll = async (req, res) => {
    try {
        const users = await getUsers();
        res.send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getOne = async (req, res) => {
    const userID = parseInt(req.params.userID);
    if (isNaN(userID)) {
        res.status(400).send('Invalid user ID');
        return;
    }

    try {
        const user = await getUser(userID);
        res.send(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
};

const ediOne = async (req, res) => {
    const { firstName, lastName, emailAdd, username } = req.body;
    const userID = parseInt(req.params.userID);
    if (isNaN(userID)) {
        res.status(400).send('Invalid user ID');
        return;
    }

    try {
        const result = await editUser(firstName, lastName, emailAdd, username, userID);
        if (result.success) {
            const updatedUsers = await getUsers();
            res.json(updatedUsers);
        } else {
            res.status(500).json({ error: result.message });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

const delOne = async (req,res)=>{
    await delUser(+req.params.userID)
    res.send(await getUsers())
}


const servAdd = async (req, res) => {
    try {
        const { servName, servDesc, servPrice, servPic } = JSON.parse(req.body);
        await addService(servName, servDesc, servPrice, servPic);
        res.send({
            msg: "You have added a service"
        });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).send({
            error: 'An error occurred while creating the service.'
        });
    }
}

const getServs = async (req, res) => {
    const products = await getServices();
    res.send(products);
}

const getServ = async(req,res)=>{
    res.send(await getService(+req.params.servID))
}

const editServ = async (req, res) => {
    const servID = parseInt(req.params.servID);
    if (isNaN(servID)) {
        res.status(400).send('Invalid service ID');
        return;
    }

    try {
        const service = await getService(servID);
        let { servName, servDesc, servPrice, servPic } = req.body;
        servName = servName ? servName : service.servName;
        servDesc = servDesc ? servDesc : service.servDesc;
        servPrice = servPrice ? servPrice : service.servPrice;
        servPic = servPic ? servPic : service.servPic;
        await editService(servName, servDesc, servPrice, servPic, servID);
        res.status(204).end();
    } catch (error) {
        console.error('Error editing service:', error);
        res.status(500).send('Internal Server Error');
    }
};
const servDel = async (req,res)=>{
    await delServ(+req.params.servID)
    res.send(await getServices())
}

const blogAdd = async(req,res)=>{
    const{blogTitle, blogAuthor, intro, blog, blogCover} = req.body
    console.log(req.body);
    await addBlog(blogTitle, blogAuthor, intro, blog, blogCover)
    res.send({
        msg:"You have added a blog"
    })
}

const gBlogs = async(req,res)=>{
    res.send(await getBlogs())
}

const gBlog = async(req,res)=>{
    res.send(await getBlog(+req.params.blogID))
}

const blogEdit = async (req, res) => {
    const [editedBlog] = await getBlog(+req.params.blogID);
    let { blogTitle, blogAuthor, intro, blog, blogCover } = req.body;
    blogTitle = blogTitle ? blogTitle : editedBlog.blogTitle;
    blogAuthor = blogAuthor ? blogAuthor : editedBlog.blogAuthor;
    intro = intro? intro : editedIntro.intro
    blog = blog ? blog : editedBlog.blog;
    blogCover = blogCover ? blogCover : editedBlog.blogCover;
    await editBlog(blogTitle, blogAuthor, blog, blogCover, +req.params.blogID);
    res.status(200).json({
        success: true,
        msg: "Blog successfully updated"
    });
}

const blogDel = async (req,res)=>{
    await delBlog(+req.params.blogID)
    res.send(await getBlogs())
}

const valFun = async (req, res) => {
    try {
        const { userPass, username } = req.body;
        if (!userPass || typeof userPass !== 'string') {
            return res.status(400).json({ msg: 'Invalid password' });
        }
        const user = await login(username, userPass);

        if (!user) {
            return res.status(401).json({ msg: 'Invalid username or password' });
        }

        // Extract the hashed password from the user object
        const hashedPassword = user.userPass;

        const match = await bcrypt.compare(userPass, hashedPassword);
        if (match) {
            const token = jwt.sign({ username: username }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.cookie('jwt', token, { httpOnly: false, expiresIn: '1h' });
            return res.status(200).json({ token: token });
        } else {
            return res.status(401).json({ msg: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(500).json({ msg: 'An error occurred' });
    }
};



const isAdmin = async (req, res) => {
    const { username } = req.body;
    try {
        const result = await adminRights(username);
        res.json({ result });
    } catch (error) {
        console.error('Error checking admin rights:', error);
        res.status(500).send('Internal Server Error');
    }
};

const revAdd = async (req, res) => {
    const { content, username } = req.body;

    try {
        await addRev(content, username);
        res.status(200).send({ msg: "Review added successfully." });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).send({ error: "An error occurred while adding the review." });
    }
};

const revsGet = async(req,res)=>{
    res.send(await getRevs())
}

const revGet = async(req,res)=>{
    res.send(await getRev(+req.params.revID))
}

const revDel = async (req,res)=>{
    await delRev(+req.params.revID)
    res.send(await getRevs())
}

const commAdd = async (req, res) => {
    const { comment, username } = req.body;

    try {
        await addComment(comment);
        res.status(200).send({ msg: "Comment added successfully." });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).send({ error: "An error occurred while adding the comment." });
    }
};


const commsGet = async(req,res)=>{
    res.send(await getComments())
}

const commGet = async(req,res)=>{
    res.send(await getBlog(+req.params.commentID))
}



const delComm = async (req,res)=>{
    await delRev(+req.params.commentID)
    res.send(await getComments())
}

const displayRev = async (req, res) => {
    try {
        const reviews = await revDisplay();
        res.status(200).json(reviews); 
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send('Internal Server Error');
    }
};

const displayComms = async (req, res) => {
    try {
        const comments = await commDisplay(); // Calling the database function
        res.status(200).json(comments); // Sending the comments data as JSON response
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Internal Server Error'); // Sending internal server error response
    }
};


const appMake = async (req, res) => {
    await makeApp(req, res);
        res.status(200).json(appointments)
};


const appsGet = async(req,res)=>{
    res.send(await getApps())
}

const appGet = async(req,res)=>{
    res.send(await getApp(+req.params.appID))
}

const getUserAppointments = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized. Token missing.' });
        }
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const userId = decodedToken.userId;
        const username = decodedToken.username;
        const userAppointments = await userApp(req, res, userId);

        res.status(200).json({ username, appointments: userAppointments });
    } catch (error) {
        console.error('Error fetching user appointments:', error);
        res.status(500).send('Internal Server Error');
    }
};

export{addOne, getAll, getOne, ediOne,delOne, servAdd, getServs, getServ, editServ, servDel, blogAdd, gBlogs, gBlog, blogEdit, blogDel, valFun, revAdd, revsGet, revGet, revDel, commAdd, commsGet, commGet, delComm, displayRev, displayComms, appMake, appsGet, appGet, getUserAppointments, isAdmin}
