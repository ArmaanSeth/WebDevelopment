const mongoose=require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/fruitsDB",{useNewUrlParser:true}).then(()=>{
    console.log("database connected")
});
 
const fruitSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"PLease check your data entry, no name specified!"]
    },
    rating:{
        type:Number,
        min:1,
        max:10
    },
    review:String
})

const Fruit=mongoose.model("Fruit",fruitSchema)

const fruit= new Fruit({
    // name:"Apple",
    rating:8,
    review:"Peaches are Tastey!!!"
})

// fruit.save() 
 
const personSchema=new mongoose.Schema({
    name:String,
    age:Number,
    favouriteFruit:fruitSchema
})

const Person=mongoose.model("Person",personSchema)

const person=new Person({
    name:"John",
    Age:32
})

// person.save()

const kiwi= new Fruit({
    name:"Kiwi",
    rating:10,
    review:"So Good!"
})

const mango= new Fruit({
    name:"Mango",
    rating:10,
    review:"Nothing better"
})

const grape= new Fruit({
    name:"Grape",
    rating:5,
    review:"Okayish"
})

const pineapple=new Fruit({
    name:"Pineapple",
    rating:9,
    review:"Great fruit"
})

const amy=new Person({
    name:"Amy",
    Age:18,
    favouriteFruit:pineapple
})



// Fruit.insertMany([kiwi,mango,grape])


async function process(){
    // await Fruit.updateOne({_id:"64451df560331078f98d3b6c"},{name:"Peach"}).then(()=>console.log("Succesfully updated the document")).catch((err)=>console.log(err));

    // await Fruit.deleteOne({name:"Peach"}).then(()=>console.log("Succesfully deleted the document")).catch((err)=>console.log(err));
    
    
    // pineapple.save()
    // await amy.save()
    
    // await Person.deleteMany({_id:{$in:["64452a87e65dec9fbb0c30af","64452a6be4384f0e10ee3d67"]}})

    await Person.updateOne({name:"John"},{favouriteFruit:kiwi})

    Fruit.find().then((fruits)=>{
        fruits.forEach(fruit=>{
            console.log(fruit.name)
        })
    }).catch((err)=>console.log(err)).finally(()=>mongoose.connection.close());
}

process()



