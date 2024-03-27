const fs = require('fs').promises;
const crypto = require("crypto");
const contactsPath = './db/contacts.json'

function listContacts() {
    
    fs.readFile(contactsPath)
        .then(data => console.table(JSON.parse(data)))
        .catch(err => console.log(err.message))
    
}

function getContactById(contactId) {
    fs.readFile(contactsPath)
        .then(data => { 
            const object = JSON.parse(data)
            const newData = object.filter(item => item.id == contactId)
            console.table(newData)
        })
        .catch(err => console.log(err.message))
    
}

function removeContact(contactId) {
    fs.readFile(contactsPath)
        .then(data => { 
            const object = JSON.parse(data)
            const newData = object.filter(item => item.id != contactId)
            console.table(newData)
            fs.writeFile(contactsPath, (JSON.stringify(newData))) 
            }
        )
        .catch(err => console.log(err.message))
    
}

function addContact(name, email, phone) {
       
    fs.readFile(contactsPath)
        .then(data => { 
          const newData = JSON.parse(data)
            newData.push({ id: crypto.randomBytes(16).toString("hex"), name: name, email: email, phone: phone })
            fs.writeFile(contactsPath, (JSON.stringify(newData)))
            
        }   
        
        )
        .catch(err => console.log(err.message))
       
}

module.exports = {listContacts, getContactById, removeContact,  addContact}