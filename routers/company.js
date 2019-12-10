const express = require('express')
const Company = require('../models/company')
const { sendEmail } = require('../email/account')
const router = new express.Router()

// get all company
router.get('/api/company', async (req, res) =>{
    try{
      const company = await Company.find({})
      res.send(company)
 
    }catch (e){
     res.status(500).send()
    }
 })

 // filter data
 router.get('/api/company/:filter', async (req, res) =>{
    try{
      // const company = await Company.find({name: req.params.filter})
      const company = await Company.find({'name': { '$regex' : req.params.filter, '$options' : 'i' } })
      res.send(company)
        console.log("the filter is: " + req.params.filter);
    }catch (e){
     res.status(500).send()
    }
 })

 // send email
 router.post('/api/company/:sendemail', async (req, res) =>{
    // console.log("post req: " + req.params.sendemail);
    try {
       
        res.status(200).send(); 
        
        try{
            const company = await Company.findById(req.params.sendemail)
            if (!company) {
                return res.status(404).send()
            }
             sendEmail(company.email, company.name);
            // sendemailmethod(company.email, "my subject", "your item has arrived");
        }catch (e){
            res.status(500).send()
        }
    }
    catch (e) {
        res.status(500).send();
    }
    
 })


 
 router.get('/api/company', async (req, res) =>{
    try{
      const company = await Company.find({})
      res.send(company)
 
    }catch (e){
     res.status(500).send()
    }
 })


 // Get company by id
 
 router.get('/api/company/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const company = await Company.findById(_id)
        if (!company) {
            return res.status(404).send()
        }
        res.send(company)
    }catch (e){
        res.status(500).send()
    }
})

//Add Copmpany 
router.post('/api/company', async (req, res) =>{
    const company = new Company(req.body)
    try{
        await company.save()
        res.status(201).send(company)
        console.log(res.data)
    }catch (e){
        res.status(400).send(e)
    }
})

// Update company
router.patch('/api/company/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    //const allowedUpdate = ['name', 'email']
    //const isValidOperation = updates.every((update) => allowedUpdate.includes(update))
    
    try{
        const company = await Company.findById(req.params.id)
        updates.forEach((update) => company[update] = req.body[update])
        await company.save()
        //const company = await Company.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if (!company){
            return res.status(404).send()
        }
        res.send(company)
    }catch (e){
        res.status(400).send()   
 }
})

// delet company
router.delete('/api/company/:id', async (req, res) => {
    try{
        const company = await Company.findByIdAndDelete(req.params.id)

        if (!company){
            return res.status(404).send()
        }
        res.send(company)
    }catch (e){
        res.status(400).send()   
 }
})


module.exports = router
