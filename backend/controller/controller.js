import {addUser, getUsers, getUser, editUser, delUser , addService, getServices, getService, editService, delServ, addBlog, getBlogs, getBlog, editBlog, delBlog, login, addRev, getRevs, getRev, delRev,addComment, getComments, revDisplay, commDisplay, makeApp, getApps, getApp, adminRights} from '../models/database.js'
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

const getAll = async(req,res)=>{
    res.send(await getUsers())
}

const getOne = async(req,res)=>{
    res.send(await getUser(+req.params.userID))
}

const ediOne = async (req, res) => {
    try {
        const { firstName, lastName, emailAdd, username } = req.body;
        const userID = +req.params.userID;

        // Update user information
        const result = await editUser(firstName, lastName, emailAdd, username, userID);

        // Check if the update was successful
        if (result.success) {
            // If successful, fetch and return updated user information
            const updatedUsers = await getUsers();
            res.json(updatedUsers);
        } else {
            // If update failed, return an error response
            res.status(500).json({ error: result.message });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
}

const delOne = async (req,res)=>{
    await delUser(+req.params.userID)
    res.send(await getUsers())
}


const servAdd = async(req,res)=>{
    const{servName, servDesc, servPrice, servPic} = req.body
    console.log(req.body);
    await addService(servName, servDesc, servPrice, servPic)
    res.send({
        msg:"You have added a service"
    })
}

const getServs = async (req, res) => {
    const products = await getServices();
    res.send(products);
}

const getServ = async(req,res)=>{
    res.send(await getService(+req.params.servID))
}

const editServ = async(req,res)=>{
    const [service] = await getService(+req.params.servID)
    let { servName, servDesc, servPrice, servPic } = req.body;
    servName ? servName=servName: {servName}=service.servName
    servDesc ? servDesc=servDesc: {servDesc}=service.servDesc
    servPrice ? servPrice=servPrice: {servPrice}=service.servPrice
    servPic ? servPic=servPic: {servPic}=service.servPic
    await editService(servName, servDesc, servPrice, servPic, +req.params.servID);
    res.status(200).json({ 
        success: true,
        msg: "Service successfully updated"
    });     

}

const servDel = async (req,res)=>{
    await delServ(+req.params.servID)
    res.send(await getServices())
}

const blogAdd = async(req,res)=>{
    const{blogTitle, blogAuthor, blog, blogCover} = req.body
    console.log(req.body);
    await addBlog(blogTitle, blogAuthor, blog, blogCover)
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
    let { blogTitle, blogAuthor, blog, blogCover } = req.body;
    blogTitle = blogTitle ? blogTitle : editedBlog.blogTitle;
    blogAuthor = blogAuthor ? blogAuthor : editedBlog.blogAuthor;
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

        // Retrieve hashed password from the database
        const hashedPassword = await login(username);
        if (!hashedPassword) {
            return res.status(401).json({ msg: 'Invalid username or password' });
        }

        // Compare passwords
        const match = await bcrypt.compare(userPass, hashedPassword);
        if (match) {
            // Generate JWT token
            const token = jwt.sign({ username: username }, process.env.SECRET_KEY, { expiresIn: '1h' });
            // Set token as cookie
            res.cookie('jwt', token, { httpOnly: true });
            return res.status(200).json({ token:token, msg: 'YAY! You have logged in.' });
        } else {
            return res.status(401).json({ msg: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'An error occurred' });
    }
};

const revAdd = async (req, res) => {
    try {
        const { content } = req.body;
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).send({ msg: "Unauthorized. Please log in." });
        }

        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(403).send({ msg: "Forbidden. Invalid token." });
            }

            const username = decoded.username; // Extract username from decoded JWT token

            // Proceed to add review with the associated username
            await addRev(content, username); // Pass username to addRev function
            res.status(200).send({ msg: "Review added successfully." });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            msg: "An error occurred"
        });
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
    try {
        const { comment } = req.body;
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).send({ msg: "Unauthorized. Please log in." });
        }

        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(403).send({ msg: "Forbidden. Invalid token." });
            }

            const username = decoded.username;

            // Proceed to add comment with the associated username
            await addComment(comment);
            res.status(200).send({ msg: "Comment added successfully." });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            msg: "An error occurred"
        });
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
    try {
        if (!req.token) {
            return res.status(401).send({ msg: "Please log in to make an appointment" });
        }
        const appointments = await makeApp(req, res);
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error making appointment:', error);
        res.status(500).send('Internal Server Error');
    }
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


export{addOne, getAll, getOne, ediOne,delOne, servAdd, getServs, getServ, editServ, servDel, blogAdd, gBlogs, gBlog, blogEdit, blogDel, valFun, revAdd, revsGet, revGet, revDel, commAdd, commsGet, commGet, delComm, displayRev, displayComms, appMake, appsGet, appGet, getUserAppointments}