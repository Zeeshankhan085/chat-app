import express from 'express';
import {createGroup, addUser, sendMessage} from '../controllers/group.controller.js'

const router=express.Router()

router.post("/", createGroup)

router.patch("/", addUser)

router.post("/:groupId/message", sendMessage)

// router.post("/logout", logout)

// router.put("/update-profile",protectRoutes, updateProfile )
// router.get('/check', protectRoutes, checkAuth)

export default router