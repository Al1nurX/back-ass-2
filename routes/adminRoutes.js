const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/admin', async (req, res) => {
    try {
        const users = await User.find();
        res.render('admin', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('An error occurred while fetching users.');
    }
});

router.post('/admin/addUser', async (req, res) => {
    const { name, password } = req.body;
    try {
        const highestUserIdUser = await User.findOne().sort({ userId: -1 });
        let userId = 1;

        if (highestUserIdUser) {
            userId = highestUserIdUser.userId + 1;
        }

        const newUser = await User.create({
            userId,
            name,
            password,
            creationDate: new Date(),
            admin: false
        });

        res.redirect('/admin');
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('An error occurred while adding user.');
    }
});

router.get('/admin/editUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }
        res.render('editUser', { user });
    } catch (error) {
        console.error('Error fetching user for edit:', error);
        res.status(500).send('An error occurred while fetching user for edit.');
    }
});

router.post('/admin/editUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { name, password } = req.body;
    try {
        await User.findByIdAndUpdate(userId, { name, password, updateDate: new Date() });
        res.redirect('/admin');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('An error occurred while updating user.');
    }
});

router.get('/admin/deleteUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        await User.findByIdAndDelete(userId);
        await User.findByIdAndUpdate(userId, { deletionDate: new Date() });
        res.redirect('/admin');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('An error occurred while deleting user.');
    }
});

router.post('/admin/deleteUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        await User.findByIdAndUpdate(userId, { deletionDate: new Date() });
        res.redirect('/admin');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('An error occurred while deleting user.');
    }
});


module.exports = router;