import { useState, useCallback } from 'react';

export default function useTrainModel() {
  const [train, setTrain] = useState('501');

  // const setTrainCode = useCallback(() => {
  //   // signout implementation
  //   return (trainCode: string)=>setTrain(trainCode); 
  // }, []);

  return {
    train,
    setTrain,
  };
}