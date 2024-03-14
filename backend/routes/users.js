import express from 'express';

import {addOne, ediOne, getAll,delOne, getOne, servAdd, getServs, getServ, editServ, servDel, blogAdd, gBlogs, gBlog, blogEdit, blogDel, valFun, isAdmin, revAdd, revsGet, revGet, revDel, commAdd, commsGet, commGet, delComm,  displayRev, displayComms, appMake, appsGet, appGet, getUserAppointments } from '../controller/controller.js';

const router = express.Router()

// Users
router.route('/users').post(addOne);
router.route('/users').get(getAll);
router.route('/users/:userID').get(getOne)
router.route('/users/:userID').patch(ediOne) 
router.route('/users/:userID').delete(delOne)

// Services
router.route('/services').post(servAdd)
router.route('/services').get(getServs);getServ
router.route('/services/:servID').get(getServ);
router.route('/services/:servID').patch(editServ)
router.route('/services/:servID').delete(servDel)

// Blogs
router.route('/blogs').post(blogAdd);
router.route('/blogs').get(gBlogs);
router.route('/blogs/:blogID').get(gBlog);
router.route('/blogs/:blogID').patch(blogEdit);
router.route('/blogs/:blogID').delete(blogDel);

// login
router.route('/login').post(valFun,(req,res)=>{
    res.send({
        msg: "YAY! You have logged in."
    })
})

// adminRights

router.route('/login').get(isAdmin)

// Reviews
router.route('/reviews').post(revAdd);
router.route('/reviews').get(revsGet);
router.route('/reviews/:display').get(displayRev);
router.route('/reviews/:revID').get(revGet);
router.route('/reviews/:revID').delete(revDel);

// comments
router.route('/comments').post(commAdd);
router.route('/comments').get(commsGet);
router.route('/comments/:display').get(displayComms);
router.route('/comments/:commentID').get(commGet);
router.route('/comments/:commentID').delete(delComm);

// Appointments
router
    .route('/appointments')
        .post(appMake)
        .get(appsGet);
router.route('/appointments/:appID').get(appGet);
router.route('/appointments/:users').get(getUserAppointments);



export default router