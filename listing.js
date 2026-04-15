const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let listingSchema = new Schema({
    title:{
        type:String,
        required : true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://imgs.search.brave.com/4GSyGUvNwfMPGFEjhCW4MBjz0jhI2dLeahjiiFh17Rk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZi5i/c3RhdGljLmNvbS94/ZGF0YS9pbWFnZXMv/aG90ZWwvc3F1YXJl/MjQwLzIyOTc0NDEz/Ni5qcGc_az1lNTQ4/NTVhNzM5MzI1YTg0/MTZjMjZhNjUxMjBi/ZWI0MzY3MTAzOWQ1/ZTk3ZmE1ZGU5NTdi/ZmZjM2QwMzVjMjlm/Jm89",
        set :(v) => v === "" ? "https://imgs.search.brave.com/-B8xM6ElJ4hgODoDtVoRbkTfn715QjPuHE4TpQHnxwQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNzE3/MTY2NzUzL3Bob3Rv/L3VzYS1uZXZhZGEt/bGFzLXZlZ2FzLXN0/cmlwLWhvdGVscy1h/bmQtZWlmZmVsLXRv/d2VyLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1fazNOcVJO/VHBNX0FPVGh2U0dY/TlROZEdHSVBRWE1m/Z1JKbEFNSkZCZnIw/PQ" 
        : v,
    },
    city:{
        type:String,
    },
    state:{
        type: String
    },
    available_slots: { 
        type: Number, 
        required: true 
    },
    
    total_slots:{
        type:Number,
        required:true
    },
    price_per_slot:{
        type:Number,
        required:true
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;


