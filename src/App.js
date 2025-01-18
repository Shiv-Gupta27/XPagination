import React, { useEffect } from "react";
import { useState } from "react";
import './App.css';
import axios from "axios";

function App() {

  const [Apidata, setApidata] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  const maxdata= 10

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        console.log(response.data);
        setApidata(response.data);
      }catch(e){
        alert('failed to fetch data');
      }
    }

    fetchData();
  },[])

  useEffect(()=>{
    const startidx = (currentpage-1)*maxdata;
    const endidx = (currentpage*maxdata);
    const displayData = Apidata.slice(startidx, endidx);

    setCurrentData(displayData);
  },[currentpage,Apidata])

  useEffect(()=>{
    setTotalPages(Math.ceil(Apidata.length/maxdata))
  }, [Apidata])


  return (
    <div className="App">
      <h2>Employee Data Table</h2>
      <div>
        <table className="PaginationTable">
          <thead >
            <tr className="TableHeading">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
          {
            currentData?currentData.map((ele, idx)=>{
                return (
                  <tr className="TableBorder" key={idx}>
                    <td>{ele.id}</td>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.role}</td>
                  </tr>
                )
            }):<></>
          }
          </tbody>
        </table>
      </div>
      <div>
        <button type="button" className="PaginationButton" disabled={currentpage ==1} onClick={(e)=>{
          setCurrentPage((prev)=>prev-1)
        }}>Previous</button>
        <span className="CurrentPageDisplay">{currentpage}</span>
        <button type="button" disabled={currentpage==totalPages} className="PaginationButton" onClick={(e)=>{setCurrentPage((prev)=>prev+1)}}>Next</button>
      </div>
    </div>
  );
}

export default App;
