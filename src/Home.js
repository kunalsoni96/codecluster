import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Plot from "react-plotly.js";
import axios from 'axios';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: `firstName`, headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 150 },
  { field: 'height', headerName: 'Height', width: 150}
  
];



export default function Home() {
  const [selectionModel, setSelectionModel] = React.useState([])
  const [age, setAge] = React.useState([])
  const [height, setHeight] = React.useState([])
  const [result, setResult] = React.useState([])
  React.useEffect(()=>{ 
      getData()
  },[])

  const getData = async() => {
    let result = await axios('https://dummyjson.com/users')
    const defaultselected = result?.data?.users.map((r) => r.id< 6 && r.id);
    commonFunction(result.data.users)
    setSelectionModel(defaultselected)
    setResult(result.data.users)
  }

  const setSelectionModelHandle = (data) => {
    setSelectionModel()
    commonFunction(data)
  }

  const commonFunction = (data) => {
    const age = result.filter(item => data.includes(item.id)).map((value)=>value.age);
    const height = result.filter(item => data.includes(item.id)).map((value)=>value.height);
    setAge(age)
    setHeight(height)
  }
return (
  <div>

  <div style={{ height: "100vh", width: '50%', float:'left' }}>
    <DataGrid
      checkboxSelection
      rows={result}
      columns={columns}
      rowSelectionModel={selectionModel}
      onRowSelectionModelChange={(data, id)=>setSelectionModelHandle(data)}
    />
  </div>
  <div style={{width:'50%', float:'right'}}>
  <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Plot
        data={[
          {
            x: age,
            y: height,
            type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'green' },
          },
        ]}
        layout={{
          title: "Growth Rate in Boys",
          xaxis: {
            title: "Age (years)",
          },
          yaxis: {
            title: "Height (inches)",
          },
        }}
      />
    </div>
  </div>
  
  </div>
  );
}