import {useState} from "react";
import {supabase} from "../supabase";


function AddEvent(){


const [eventName,setEventName]=useState("");

const [criteria,setCriteria]=useState([
{
name:"",
marks:""
}
]);





function addCriteria(){

setCriteria([
...criteria,
{
name:"",
marks:""
}
]);

}




function updateCriteria(index,key,value){

const data=[...criteria];

data[index][key]=value;

setCriteria(data);

}





async function createEvent(){


if(!eventName){

alert("Enter Event Name");

return;

}



const {error}=await supabase

.from("events")

.insert({

event_name:eventName,

criteria:criteria

});



if(error){

alert(error.message);

return;

}



alert(
"Event Created Successfully"
);



setEventName("");

setCriteria([
{
name:"",
marks:""
}
]);


}




return(

<div className="p-8">


<h1 className="text-3xl font-bold mb-5">

Add Event

</h1>



<input

className="border p-3 w-full mb-5"

placeholder="Event Name"

value={eventName}

onChange={(e)=>setEventName(e.target.value)}

/>





<h2 className="text-xl font-bold">

Criteria

</h2>



{

criteria.map((item,index)=>(


<div

key={index}

className="flex gap-3 mt-3"


>


<input

className="border p-2"

placeholder="Criteria Name"

value={item.name}

onChange={(e)=>
updateCriteria(
index,
"name",
e.target.value
)
}

/>



<input

className="border p-2"

placeholder="Marks"

type="number"

value={item.marks}

onChange={(e)=>
updateCriteria(
index,
"marks",
e.target.value
)
}

/>



</div>


))

}




<button

className="bg-blue-600 text-white px-4 py-2 mt-5 rounded"

onClick={addCriteria}

>

+ Add Criteria

</button>




<br/>


<button

className="bg-green-600 text-white px-6 py-3 mt-5 rounded"

onClick={createEvent}

>

Create Event

</button>



</div>

)


}


export default AddEvent;