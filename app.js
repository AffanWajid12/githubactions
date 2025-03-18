const express = require('express')
const app = express()
const port = 3000

current_user = null
users = {}
all_events = []
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/register', (req, res) => {
    console.log(req.body)
    const {username,password} = req.body
    users[username] = password
    res.send({password:users[username],username:username,message:"User registered successfully"})
})
app.get('/login', (req, res) => {
    const {username,password} = req.body
    if(users[username] == password)
    {
        current_user = username
        res.send({message:"User logged in successfully"})
        return
    }
    res.send({message:"User doesn't exist or password is wrong"})
})

app.post('/events',(req,res)=>{
    const {name,description,date,time,category} = req.body
    if(!current_user)
    {
        res.send({message:"Login first"})
        return
    }
    all_events.push({name,description,date,time,category,current_user})
    res.send({message:"New event added!"})
})
app.get('/events',(req,res)=>{

    if(!current_user)
        {
            res.send({message:"Login first"})
            return
        }
    users_event = all_events.filter((e)=>e.current_user == current_user)
    users_event = users_event.sort((a,b)=>a.date>b.date)
    res.send({users_event})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})