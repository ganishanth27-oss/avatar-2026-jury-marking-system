import {useState} from "react";
import {supabase} from "../supabase";
import {events} from "../components/events";
import {useNavigate} from "react-router-dom";


function JurySignup(){

const navigate = useNavigate();


const [name,setName]=useState("");
const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [event,setEvent]=useState("");

const [loading,setLoading]=useState(false);



async function signup(){


if(!name || !username || !password || !event){

alert("Fill all details");
return;

}


setLoading(true);



const {data:existingUser,error:checkError}=await supabase

.from("juries")

.select("*")

.eq(
"username",
username
);



if(checkError){

alert(checkError.message);
setLoading(false);
return;

}



if(existingUser.length>0){

alert("Username already exists");
setLoading(false);
return;

}





const {error}=await supabase

.from("juries")

.insert([

{

name:name,

username:username,

password:password,

event:event

}

]);





if(error){

alert(error.message);

}

else{


alert(
"Registration Successful"
);


setName("");
setUsername("");
setPassword("");
setEvent("");


navigate("/jury/login");


}



setLoading(false);



}





return(

<div className="min-h-screen bg-gray-100 flex justify-center items-center">


<div className="bg-white shadow-xl rounded-xl p-8 w-96">


<h1 className="text-3xl font-bold text-center mb-6">

Jury Signup

</h1>



<input

className="border p-3 w-full mb-3 rounded"

placeholder="Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>




<input

className="border p-3 w-full mb-3 rounded"

placeholder="Username"

value={username}

onChange={(e)=>setUsername(e.target.value)}

/>




<input

className="border p-3 w-full mb-3 rounded"

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>





<select

className="border p-3 w-full mb-4 rounded"

value={event}

onChange={(e)=>setEvent(e.target.value)}

>


<option value="">

Select Event

</option>



{

events.map((item)=>(

<option

key={item}

value={item}

>

{item}

</option>


))

}



</select>






<button

disabled={loading}

className="bg-blue-600 text-white p-3 w-full rounded"

onClick={signup}

>


{

loading

?

"Registering..."

:

"Signup"

}


</button>



</div>


</div>


)


}


export default JurySignup;