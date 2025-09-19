import express from 'express';
import {createGroup, addUser, sendMessage, getGroups, getMessages} from '../controllers/group.controller.js'

const router=express.Router()

router.post("/", createGroup)
router.get("/", getGroups)
router.patch("/:groupId/users", addUser)
// router.get("/users", get)

router.post("/:groupId/message", sendMessage)
router.get("/:groupId/messages", getMessages)

// router.post("/logout", logout)

// router.put("/update-profile",protectRoutes, updateProfile )
// router.get('/check', protectRoutes, checkAuth)

export default router