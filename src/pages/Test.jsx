import {supabase} from "../supabase";


function Test(){


async function check(){


const {data,error}=await supabase
.from("juries")
.select("*");


console.log(data,error);


}


return(

<div>

<h1>
Supabase Test
</h1>


<button onClick={check}>
Check Database
</button>


</div>

)

}


export default Test;