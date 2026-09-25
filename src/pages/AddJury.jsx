import { useState } from "react";
import { supabase } from "../supabase";


function AddJury(){


const [name,setName]=useState("");

const [username,setUsername]=useState("");

const [password,setPassword]=useState("");

const [event,setEvent]=useState("");

const [loading,setLoading]=useState(false);




// ===============================
// 35 EVENTS
// ===============================


const events=[

 "Solo Song",
  "Solo Dance",
  "Group Dance",
  "Instrumental Music",
  "Mime",
  "Mono Act",
  "Fashion Parade",
  "Mr. & Ms. Fest",
  "Pencil Sketching",
  "Photography",
  "Bridal Makeup",
  "Mehendi",
  "Chill Chef",
  "RJ Hunt",
  "Street Play",
  "Wealth Out of Waste",
  "Technical Quiz",
  "Web Design",
  "Coding Challenge",
  "Hackathon",
  "Ideathon",
  "Digital Designing",
  "Drone Challenge",
  "Best Manager",
  "Commerce Dumb Charades",
  "Vyaapaar Vision",
  "Brand Blitz",
  "Logo Designing",
  "Ad Zap",
  "IPL Auction",
  "Meme Creation",
  "Reels Challenge",
  "Rapid Fire",
  "Freeze Dance",
  "Guess the Song",
];




// ===============================
// CREATE JURY
// ===============================


async function createJury(e){


e.preventDefault();



if(
!name ||
!username ||
!password ||
!event
){

alert("Please fill all fields");

return;

}



setLoading(true);



const {error}=await supabase

.from("juries")

.insert({

name:name,

username:username,

password:password,


// selected event

event:event,


current_status:"Offline",

last_seen:new Date().toISOString(),

submitted:false


});




if(error){


console.log(error.message);

alert(error.message);

setLoading(false);

return;


}




alert("Jury Created Successfully");



setName("");

setUsername("");

setPassword("");

setEvent("");



setLoading(false);



window.location.href="/admin/dashboard";


}






return(


<div className="min-h-screen bg-gray-100 p-8">


<div className="max-w-xl mx-auto">



<div className="flex justify-between items-center mb-6">


<h1 className="text-3xl font-bold">

Add New Jury

</h1>



<button

className="bg-gray-600 text-white px-4 py-2 rounded"

onClick={()=>{

window.location.href="/admin/dashboard"

}}

>

Back

</button>



</div>





<div className="bg-white p-6 rounded-xl shadow">


<form onSubmit={createJury}>


<label className="font-semibold">

Jury Name

</label>


<input

className="border w-full p-3 rounded mb-5 mt-2"

placeholder="Enter Jury Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>






<label className="font-semibold">

Username

</label>


<input

className="border w-full p-3 rounded mb-5 mt-2"

placeholder="Enter Username"

value={username}

onChange={(e)=>setUsername(e.target.value)}

/>







<label className="font-semibold">

Password

</label>


<input

type="password"

className="border w-full p-3 rounded mb-5 mt-2"

placeholder="Enter Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>









<label className="font-semibold">

Event Name

</label>



<select


className="border w-full p-3 rounded mb-6 mt-2"


value={event}


onChange={(e)=>setEvent(e.target.value)}

>



<option value="">


Select Event


</option>



{

events.map((item,index)=>(


<option

key={index}

value={item}

>

{item}

</option>



))


}



</select>







<button

type="submit"

disabled={loading}

className="bg-green-600 text-white w-full py-3 rounded font-bold"

>


{

loading

?

"Creating..."

:

"Create Jury"

}



</button>





</form>



</div>




</div>


</div>



)


}


export default AddJury;