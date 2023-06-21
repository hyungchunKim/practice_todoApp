import React, { useState } from 'react'

const List = React.memo(({
    id, title, completed, todoData, setTodoData, provided, snapshot, handleClick
}) => {
        console.log('List Component')

        const [isEditing, setIsEditing] = useState(false);
        const [editedTitle, setEditedTitle] = useState(title);

        //수정중인 상태 / 수정된 상태 만들어주기

        const handleCompleteChange = (id) => {
        let newTodoData = todoData.map(data => {
            if(data.id === id) {
            completed = !completed;
            }
            return data;
        });
        setTodoData(newTodoData);
        localStorage.setItem('todoData', JSON.stringify(newTodoData));    
        }
        
        const handleEditChange = (event) => {
          setEditedTitle(event.target.value);
        }

        const handleSubmit = (event) => {
          event.preventDefault();

          let newTodoData = todoData.map(data => {
            if(data.id === id){
              data.title = editedTitle
            }
            return data;
          })
          setTodoData(newTodoData);
          localStorage.setItem('todoData', JSON.stringify(newTodoData));  
          setIsEditing(false);
        }

        if(isEditing) {
          return(
            <div 
              className={`flex items-center justify-between w-full px-4 py-1 my-2 "bg-gray-100" text-gray-600 border rounded`}
            >
              <div className="items-center">
                <form onSubmit={handleSubmit}>
                <input 
                value={editedTitle}
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                onChange={handleEditChange} 
                />
                </form>
              </div>
              <div className="items-center">
                <button className="px-4 py-2 float-right" onClick={() => setIsEditing(false)}>x</button>
                <button className="px-4 py-2 float-right" onClick={handleSubmit}
                type="submit">save</button>
              </div>
            </div>
          )
        } else{

          return (
            <div 
              key={id} 
              {...provided.draggableProps} 
              ref={provided.innerRef} 
              {...provided.dragHandleProps}
              className={`${
              snapshot.isDragging ? "bg-gray-400" : "bg-gray-100" 
              } flex items-center justify-between w-full px-4 py-1 my-2     text-gray-600 border rounded`}
            >
              <div className="items-center">
                <input 
                type="checkbox" 
                onChange={() => handleCompleteChange(id)}
                defaultChecked={completed}  
                />{" "}
                <span className={completed ? "line-through" : undefined}>
                  {title}
                </span>  
              </div>
              <div className="items-center">
                <button className="px-4 py-2 float-right" onClick={() => handleClick(id)}>x</button>
                <button className="px-4 py-2 float-right" onClick={() => setIsEditing(true)}>edit</button>
              </div>
            </div>
          )   
        }
      } 
  )

export default List




//localStorage에 todoData를 담으면 페이지를 refresh해도 todoData가 계속 남아 있을수 있다.
// 브라우저 안의 local Storage

// 넣는 방법 localStorage.setItem('key', 'value');
//state를 set해주는 함수가 실행될때 그 밑에 바로 넣어주면 된다. value는 바뀌기 원하는 값

//value 값을 넣어줄때 JSON.stringify를 해줘야 하는데 그 이유는 텍스트로 변환하지 않고 넣게 되면 객체나 배열의 값이 아니라 타입이 나온다


//localStroge에 저장된 tododData 활용하기 

// initialTodoData 만들어서 조건문으로 localStorage에서 데이터를 가져올때 만약에 해당하는 키로 저장된 값이 있으면 그것을 가져오고 아니면 빈배열을 todoData로 반환해라 이때 값은 JSON.parse()로 다시 parsing해서 가져온다.