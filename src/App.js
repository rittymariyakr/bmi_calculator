import './App.css';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { useState } from 'react';

function App() {

  const [bmi , setBmi] = useState(0)
  const [bmival , setBmival] = useState('')

  const [weight , setWeight] = useState(0)
  const [height , setHeight] = useState(0)

  const [isWeight , setIsWeight] = useState(true)
  const [isHeight , setisHeight] = useState(true)

  const [error , setError] = useState(true)


  const bmiValidate = (e) =>{
    const{name, value} = e.target
    console.log(e.target);
    console.log(name,value);

    if(!!value.match(/^[0-9]*.?[0-9]+$/)){ 
      if(name==='weight'){
        setWeight(value)
        setIsWeight(true)
      }
      else if(name=='height'){
        setHeight(value)
        setisHeight(true)
      }
    }
    else{
      if(name==='weight'){
        setWeight(value)
        setIsWeight(false)
      }
      else if(name==='height'){
        setHeight(value)
        setisHeight(false)
      }
    }
  }

  const handleCalculate = (e)=>{
    e.preventDefault();
    if(!weight || !height){
      setError("Enter valid data!!");
    }
    else{
      const bmi = weight / ((height * height) / 10000);
      setBmi(bmi);

      if(bmi<18.6){
        setBmival("Under Weight...!!");
      }
      else if(bmi>=18.6 && bmi <=24.9){
        setBmival("Healthy Weight!");
      }
      else{
        setBmival("Over Weight...!!");
      }
    }
  };

  const handleReset = (e) =>{
    setBmi(0)
    setBmival('')
    setWeight(0)
    setHeight(0)
    setError('')
    setIsWeight(true)
    setisHeight(true)
  }

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
    <div className='bg-dark p-4 rounded' style={{ maxWidth: '500px', width: '90%', minWidth: '200px' }}>
      <h1 className='text-light text-center' style={{ fontFamily: 'Lorem', fontSize: '30px', fontWeight: 'bold' }}>
        BMI Weight Calculator
      </h1>
      <p className='text-light text-center' style={{ fontFamily: 'Lorem', fontWeight: 'bold' }}>Find Your Body Mass Index</p>
      <div className='bg-secondary d-flex justify-content-center align-items-center flex-column rounded-circle mt-4 mx-auto' style={{ width: '230px', height: '230px' }}>
        <div className='bg-warning d-flex justify-content-center align-items-center flex-column rounded-circle' style={{ width: '210px', height: '210px' }}>
          <div className='bg-dark d-flex justify-content-center align-items-center flex-column rounded-circle' style={{ width: '190px', height: '190px' }}>
            <h1 className='text-light'>{bmi.toFixed(1)} <span className='fs-4'>kg/m<sup>2</sup></span></h1>
            <h4 className={bmival === 'Healthy Weight!' ? 'green' : bmival === 'Under Weight...!!' || bmival === 'Over Weight...!!' ? 'red' : ''}>{bmival}</h4>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <form className='bg-light rounded p-4' onSubmit={handleCalculate}>
          <div><h5 className='text-center text-danger'>{error}</h5></div>
          <div className='text-center'>
            <TextField name='weight' value={weight || ''} onChange={(e) => { bmiValidate(e) }} id="standard-basic" label="Weight (kg)" variant="standard" />
            {!isWeight &&
              <div>
                <span className='text-danger'>Invalid Input</span>
              </div>
            }
          </div>
          <div className='text-center mt-3 mb-3'>
            <TextField name='height' value={height || ''} onChange={(e) => { bmiValidate(e) }} id="standard-basic" label="Height (cm)" variant="standard" />
            {!isHeight &&
              <div>
                <span className='text-danger'>Invalid Input</span>
              </div>
            }
          </div>
          <div className='d-flex justify-content-center'>
            <Button type='onSubmit' style={{ width: '150px', height: '50px', backgroundColor: 'rgb(196, 49, 220)' }} variant="contained">CALCULATE</Button>
            <Button onClick={handleReset} style={{ width: '150px', height: '50px', marginLeft: '10px' }} variant="outlined">RESET</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
}

export default App;
