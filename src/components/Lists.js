import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import List from './List';

const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {
  
  const handleEnd = (result) => {
    console.log('result', result);
    // result 매개변수에는 source항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함됩니다.
    //목적지가 없으면 (이벤트 취소) 이 함수를 종료합니다.
    if(!result.destination) return;     // 만약에 목적지가 없으면 이 함수를 종료해라.

    const newTodoData = [...todoData];    // 리액트의 불변성을 지켜주기위해 새로운 todoData생성

    const [reorderedItem] = newTodoData.splice(result.source.index, 1);
    // 1. 변경시키는 아이템을 배열에서 지워줍니다. 그리고 그것을 reorderedItem 배열에 넣습니다.
    // 2. return 값으로 지워진 아이템을 잡아줍니다.

    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));  
    // 원하는 자리에 reorderedItem을 insert 해준다.
}
  console.log('Lists Component')
  return (
    
    // Props로 필요한 데이터 함수 가져오기
    
    // rfc : 함수형 컴포넌트 기본구조 생성 단축키
    // rce : 클래스형 컴포넌트 기본구조 생성 단축키
    
    // const btnStyle = {
    //   color: "#fff",
    //   border: "none",
    //   padding: "5px 9px",
    //   borderRadius: "50%",
    //   cursor: "pointer",
    //   float: "right"
    // }



      // this.setState({todoData: newTodoData});
    
                            
    
    // const getStyle = (completed) => {
    //   return {
    //     padding: "10px",
    //     borderBottom: "1px #ccc dotted",
    //     textDecoration: completed ? "line-through" : "none"
    //   }
    // }
  
    <div>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="todo">
            {/* 원하는 droppableId 주기          */}
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {/* droppable을 사용해서 전해지는 정보를 div에 주기 */}
                {todoData.map((data, index) => (     
                  <Draggable
                    key={data.id}
                    draggableId={data.id.toString()}
                    index={index}
                  >
                  {(provided, snapshot) => (
                      <List
                        key={data.id}
                        id={data.id}
                        title={data.title}
                        completed={data.completed}
                        todoData={todoData}
                        setTodoData={setTodoData}
                        provided={provided}
                        snapshot={snapshot}
                        handleClick={handleClick}                  
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {/* // dragging이 자연스럽게 되도록 하는 역할 */}
            </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

  )
}
)
export default Lists

// State 를 가져올때 useState를 가져와도 되지만 그 부분이 다른곳에서도 쓰이기 때문에 부모 파일에 Props를 작성해주는것이 더 좋다.



// 리액트의 불변성이란? 

// 사전적의미로는 값이나 상태를 변경할 수 없는 것을 의미
// 원시타입은 불변성을 지니고 있고 참조타입은 그렇지 않다.

// 원시타입은 call stack에 저장 , 참조타입의 값이 아닌 참조 ID는 값으로 저장
// 참조타입의 ID와 값 (Array , Object) Heap에 저장

// 원시타입은 고정된 크기로 Call stack 에 메모리 저장, 실제 데이터가 변수에 할당
//참조 타입은 데이터 크기가 정해지지 않고 Callstack 메모리에 저장, 데이터의 값이 heap에 저장되며 변수에 heap 메모리 주소의 값이 할당

// 원시타입은 원래 불변성을 가지고 있으므로 React에서 신경을 써주지 않아도 된다. 하지만 참조타입은 불변성이 아니기때문에 배열에 대한 요소를 추가하거나 객체 속성 값을 변경 할때, Call stack의 참조 ID는 동일하게 유지되고 Heap에있는 메모리에서만 변경이 일어난다. 그래서 리액트에서는 참조타입이 불변성을 유지하도록 신경을 써줘야한다.

//불변성을 지켜야하는 이유

//참조타입에서 객체나 배열의 값이 변할 때 원본 데이터가 변경되기에 이 원본데이터를 참조하고 있는 다른 객체에서 예상치 못한 오류가 발생할 수 있어서 프로그래밍의 복잡도가 올라갑니다.
//리엑트에서 화면을 업데이트 할때 불변성을 지켜서 값을 이전 값과 비교해서 변경된 사항을 확인한 후 업데이트 하기 때문에 불변성을 지켜줘야합니다.

//불변성을 지키는 방법 => 아예 새로운 배열을 반환해주는 메서드를 사용한다.
//ex) spread operator, map, filter, slice, reduce

// 원본 데이터를 변경하는 메서드 => splice, push 

//useMemo 를 이용한 컴포넌트 렌더링 최적화
// 리렌더링 되기를 원하지 않는 컴포넌트에 useMemo를 전체에 씌워준다.


//useCallback을 이용한 함수 최적화

// 원래 컴포넌트가 렌더링 될 때 그안에 있는 함수도 다시 만들게 된다. 그런데 이것을 렌더링 할때마다 계속 다시만드는것은 좋은것이 아니다. 그리고 만약 이 함수가 자식컴포넌트에 props로 내려주게 되면 함수를 포함한 컴포넌트가 리렌더링 될때마다 자식 컴포넌트도 함수가 새롭게 만들어져서 계속 리렌더링 하게 된다. 이것을 막기위해 useCallback()을 사용한다.

//useCallback 적용은 useCallback 안에 콜백함수와 의존성 배열을 순서대로 넣어주면 된다.
//함수 내에서 참조하는 state, props가 있다면 의존성 배열을 추가해주면 된다.
// useCallback으로 인해서 의존성 배열안의 변수가 변하지 않는다면 함수는 새로 생성되지 않는다.
// 새로 생성되지 않기때문에 메모리에 새로 할당되지 않고 동일 참조값을 사용한다.
// 의존성 배열에 아무것도 없다면 컴포넌트가 최초 렌더링 시에만 함수가 생성되며 그 이후에는 동일한 참조값을 사용하는 함수가 된다.

