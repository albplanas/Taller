
  
  
  function intersection(arr1,arr2){
    return arr1.filter(x => arr2.includes(x));
  }
  function difference_A_B(arr1,arr2){
      return  arr1.filter(x => !arr2.includes(x))
  }


  export{
    intersection as intersection,
    difference_A_B as difference_A_B

  } 