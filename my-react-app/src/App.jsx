import React,{useState,useEffect} from 'react'

 function App() {

//variables useful for states data and queries!
const [query,setQuery]=useState(' ')
const [datas,Setdata]=useState([])
const [finalquery,setFQuery]=useState('')


//function that is used on input to get the data within in it
const changehandler=(e)=>
  {
    setQuery(e.target.value)
  }

  //use the final query (what the user asked) to ask api the data
  useEffect(()=>{
    fetchData()
  },[finalquery]) 

//prevent the browser refreshing if data not changed or is empty
//and when we click the "Search" button make that query the final query!
const sumbitHandler=(e)=> 
  {
    e.preventDefault()
    setFQuery(query)
  }


  //fetch data here from the api! u can change the n to whatever number u want
 function fetchData ()
  {
    fetch('https://myanimelist.p.rapidapi.com/v2/anime/search?q='+query+'&n=20&genre=1',{
	  "method": "GET",
	  "headers": {
		'x-rapidapi-key': 'b8c025b4d0msh8bfc6079fcfdb1dp18ab0ejsnabf8eaf28d57',
		'x-rapidapi-host': 'myanimelist.p.rapidapi.com'
	  }
})
.then(response=>{  //turn that data to json array
  return response.json();
})  //then save it with the function of setdata
.then (data=>
  {
    Setdata(data)
  })
.catch(error=>{ //catch errors if any
  console.log(error);
});

  
  }

  //the search here !
  return(<>

    <form  onSubmit={sumbitHandler}>
      <div className="search-bar-container">
        <input className="search-input" title="Search Anime" type="text" value={query} onChange={changehandler}/>
        <button className="search-button" type='submit'>Search</button>
      </div>
    </form>
  
  
  
    {datas.map((item,index)=>   //the results print here
    {
      return (
      <div key={index} className='card'> 
        <a target="_blank"  href={item.myanimelist_url}> 
          <img className='card-imagine' src={item.picture_url} alt="anime imagine" />
          </a>
        <h2 className='card-title'>{item.title}</h2>
        <p className='card-text'>{item.description}</p>
       
      </div>)
    })}
  </>);
}

export default App
