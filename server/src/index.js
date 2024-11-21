const express=require('express')
const app=express()
const port=process.env.PORT || 3000;
const cors=require('cors');
const csv = require('csv-parser');
const fs = require('fs');


app.use(cors(
    {
        origin:"http://localhost:5173"
    } 
));
app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).json({msg:"recieved get request"});
})




app.get('/data', (req, res) => {
    const results = [];
    const filePath="./src/utils/cdata.csv";
    if(!fs.existsSync(filePath)){
        return res.status(404).json({msg:"file not found"});
    }
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.status(200).json(results)
    })
    .on('error', (err) => {
        res.status(500).json({ error: "Failed to process CSV file" });
      });
});


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})