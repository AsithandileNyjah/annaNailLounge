import { pool } from '../config/config.js';


// users
const addUser = async (firstName, lastName, emailAdd, username, userPass) => {
    try {
        // Check if email or username already exists
        const [existingUser] = await pool.query(
            `SELECT * FROM users WHERE emailAdd = ? OR username = ?`,
            [emailAdd, username]
        );

        console.log("Existing user:", existingUser);

        if (existingUser.length > 0) {
            throw new Error("User with the provided email or username already exists.");
        }
        // If user doesn't exist, insert into the database
        await pool.query(
            `INSERT INTO users (firstName, lastName, emailAdd, username, userPass) 
            VALUES (?, ?, ?, ?, ?)`,
            [firstName, lastName, emailAdd, username, userPass]
        );

        console.log("User added successfully.");
    } catch (error) {
        console.error("Error adding user:", error);
    }
};

const getUsers = async (req,res)=>{
    const [users] = await pool.query(`
    SELECT * 
    FROM users
    `)
    return users
}

const getUser = async (userID)=>{
    const [user] = await pool.query(`
    SELECT * 
    FROM users WHERE userID = ?
    `,[userID])
    return user
}

const editUser = async (firstName, lastName, emailAdd, username, userID) => {
    try {
        // Perform the update query without considering username uniqueness
        await pool.query(`
            UPDATE users 
            SET firstName = ?, lastName = ?, emailAdd = ?, username = ?
            WHERE userID = ?`,
            [firstName, lastName, emailAdd, username, userID]
        );
        
        // Return a success message or handle the result as needed
        return { success: true, message: 'User updated successfully' };
    } catch (error) {
        // Handle any errors that may occur during the update operation
        console.error('Error updating user:', error);
        return { success: false, message: 'Failed to update user' };
    }
}

const delUser = async(userID)=>{
    const [result] = await pool.query(`
    DELETE FROM users
    WHERE userID = ?  
    `,[userID])
    return result
}

// services

const addService = async(servName, servDesc, servPrice, servPic)=>{
    await pool.query(`
    INSERT INTO services (servName, servDesc, servPrice, servPic)
     VALUES (?, ?, ?, ?);
    `,[servName, servDesc, servPrice, servPic])
}

const getServices = async(req,res)=>{
    const [services] = await pool.query(`
    SELECT *
    FROM services
    `)
    return services
}

const getService = async (servID)=>{
    const [service] = await pool.query(`
    SELECT * 
    FROM services WHERE servID = ?
    `,[servID])
    return service
}

const editService = async (servName, servDesc, servPrice, servPic, servID) => {
    const [edit] = await pool.query(`
    UPDATE services SET 
    servName = ?,  
    servDesc = ?, 
    servPrice = ?, 
    servPic = ? 
    WHERE servID = ?;    
    `, [servName, servDesc, servPrice, servPic, servID]);
    return edit
};
const delServ = async(servID)=>{
    const [result] = await pool.query(`
    DELETE FROM services
    WHERE servID = ?  
    `,[servID])
    return result
}

// blogs
const addBlog = async(blogTitle, blogAuthor, intro, blog, blogCover)=>{
    await pool.query(`
    INSERT INTO blogs (blogTitle, blogAuthor, intro, blog, blogCover)
     VALUES (?, ?, ?, ?);
    `,[blogTitle, blogAuthor, intro, blog, blogCover])
}

const getBlogs = async(req,res)=>{
    const [blogs] = await pool.query(`
    SELECT *
    FROM blogs
    `)
    return blogs
}

const getBlog = async (blogID)=>{
    const [blog] = await pool.query(`
    SELECT * 
    FROM blogs WHERE blogID = ?
    `,[blogID])
    return blog
}

const editBlog = async (blogTitle, blogAuthor, blog, intro, blogCover, blogID) => {
    const [edit] = await pool.query(`
    UPDATE blogs SET 
    blogTitle = ?,  
    blogAuthor = ?, 
    blog = ?, 
    intro = ?,
    blogCover = ? 
    WHERE blogID = ?;    
    `, [blogTitle, blogAuthor, blog, intro, blogCover, blogID]);
    return edit
};

const delBlog = async(blogID)=>{
    const [result] = await pool.query(`
    DELETE FROM blogs
    WHERE blogID = ?  
    `,[blogID])
    return result
}

// login
const login = async (username, userPass) => {
    const [[{ userPass }]] = await pool.query(`
        SELECT userPass
        FROM users
        WHERE username = ?`, [username]);
    return userPass;
};


const adminRights = async (username) => {
    const [[{ userRole }]] = await pool.query(`
        SELECT userRole
        FROM users
        WHERE username = ?
    `, [username]);
    return userRole;
};



// reviews
const addRev = async (content) => {
    await pool.query(`
        INSERT INTO reviews (content)
        VALUES (?);
    `, [content]);
};

const getRevs = async(req,res)=>{
    const [reviews] = await pool.query(`
    SELECT * FROM reviews
    `)
    return reviews
}

const getRev = async (revID)=>{
    const [review] = await pool.query(`
    SELECT * 
    FROM reviews WHERE revID = ?
    `,[revID])
    return review
}

// will not have an edit review function
const delRev = async(revID)=>{
    const [result] = await pool.query(`
    DELETE FROM reviews
    WHERE revID = ?  
    `,[revID])
    return result
}

// comments
const addComment = async (comment) => {
    await pool.query(`
        INSERT INTO comments (comment)
        VALUES (?);
    `, [comment]);
};

const getComments = async (req,res) => {
    const [comments] = await pool.query(`
        SELECT * 
        FROM comments 
    `,);
    return comments;
};

const getComment = async (commentID) => {
    const [comment] = await pool.query(`
        SELECT * 
        FROM comments 
        WHERE commentID = ?
    `, [commentID]);
    return comment;
};

// There will not be an edit comment function
const delComment = async (commentID) => {
    const [result] = await pool.query(`
        DELETE FROM comments
        WHERE commentID = ?
    `, [commentID]);
    return result;
};

// Displaying reviews

const revDisplay = async(req,res)=>{
    const [display] = await pool.query(`
    SELECT reviews.revID, reviews.content, users.username
    FROM reviews
    INNER JOIN users ON reviews.userID = users.userID;
    `)
    return display
}


const commDisplay = async(req,res)=>{
    const [display] = await pool.query(`
    SELECT comments.commentID, comments.comment, users.username
    FROM comments
    INNER JOIN users ON comments.userID = users.userID;
    `)
    return display
}

const makeApp = async (req, res) => {
    const { service, appDate, appTime, addOns } = req.body;
    const { username } = req; // Assuming the username is decoded and available in the request object

    try {
        const [appointment] = await pool.query(`
            INSERT INTO appointments (service, appDate, appTime, addOns, username) 
            VALUES (?, ?, ?, ?, ?);
        `, [service, appDate, appTime, addOns, username]);

        return appointment;
    } catch (error) {
        console.error('Error making appointment:', error);
        throw error; // Rethrow the error to be caught by the calling function or middleware
    }
}


const getApps = async(req,res)=>{
    const [appointments] = await pool.query(`
    SELECT * FROM appointments
    `)
    return appointments
}

const getApp = async(appID)=>{
    const [appointment] = await pool.query(`
    SELECT * 
    FROM appointments 
    WHERE appID = ?
    `,[appID])
    return appointment
}

const userApp = async(req,res)=>{
    const [userAppointments] = await pool.query(`
    SELECT *
    FROM appointments
    WHERE userID = ?
    `, [userId]);
    return userAppointments
}

export { addUser, getUsers, getUser,editUser, delUser, addService, getServices, getService, editService, delServ, addBlog, getBlogs, getBlog, editBlog, delBlog, login, addRev, getRevs, getRev, delRev, addComment, getComments, getComment, delComment, revDisplay, commDisplay, makeApp, getApps, getApp, userApp, adminRights };
