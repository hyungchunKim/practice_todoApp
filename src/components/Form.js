import React from 'react'

export default function ({value, setValue, handleSubmit}) {
  
  console.log('Form Component')

  const handleChange = (e) => {
    console.log('e', e.target.value);
    // this.setState({value: e.target.value}); 
    setValue(e.target.value);
  }
  
  return (
    <div>
      <form 
      style={{ display: 'flex' }} 
      onSubmit={handleSubmit} 
      className="flex pt-2"
      >                
        <input type="text" 
          name="value"
          className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow" 
          // style={{ flex: '10', padding: '5px'}} 
          placeholder="해야 할 일을 입력하세요." 
          value={value} 
          onChange= {handleChange}
        />
        <input 
          type="submit"
          value="입력"
          className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
          // className="btn"
          // style={{ flex: '1' }} 
        />
      </form> 
    </div>
  )
}
