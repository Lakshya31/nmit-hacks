let fs = require("fs")

data = fs.readFileSync(__dirname+"/../Dashboard/path.json")
data = JSON.parse(data)
const path1=Object.keys(data).map((obj)=>{
    // let data = Path1[obj]
    return {
        vendor:obj,
        path:data[obj]['routes'].map(obj1=>(obj1['latlons'].reverse())),
        timestamps:data[obj].time
    }
})

fs.writeFileSync("path1.json",JSON.stringify(path1))