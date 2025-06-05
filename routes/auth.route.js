const express = require('express');
const router = express.Router();
const {Login} = require('../services/auth.service');


router.post('/login', async (req, res) => {
    
    const {email, password} = req.body;

    try {
        const {token, usuario} = await Login(email, password);
        res.json({token, usuario});
        
    } catch (error) {
        res.status(401).json({message: error.message});
    }

});

module.exports = router;