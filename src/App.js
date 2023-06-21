import React, {useState, useCallback} from "react"; 
//{Component}도 extends 해주지않아서 필요없기 때문에 제거
//그리고 리액트에서 useState 가져오기
// 리액트 라이브러리에서 useCallback 가져오기
import "./App.css";
import Lists from "./components/Lists";  // <> 안에 적고 엔터누르면 자동으로 경로 가져옴
import Form from "./components/Form";


const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];


export default function App () {   // class -> function 으로 교체 extends 함수에서 불필요
  console.log('App Component')
  // state = {
  //   todoData: [],     ====> 교체
  //   value: ""  
  // }
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");
  // todoData 를 getter setter로 바꿔주고 처음에 빈배열로 받았으니 그대로 빈배열로 받아준다.
  // value도 역시 초기값인 ""을 그대로 받아준다.
  // 배열의 첫번째 인수는 변수의 이름 , 두번째 인수는 State를 정하는 함수

  // 클래스 형일때는 this 를 사용했지만 이제 접근이 필요없이 그대로 쓰면되서 this 써진 부분들을 바꿔준다.
  // this.state.value -> value , this.state.todoData -> todoData

  //this.setState 사용한 부분 setter 함수 로 바꿔준다.

  //함수 및 변수 정의 방법 변경 
  //원래 클래스 컴포넌트에서는 함수 이름 만으로 가능 했지만 함수형 컴포넌트에서는 let이나 const를 넣어주어야한다.

  // 정의된 함수 및 메소드 사용방법 변경 -> 기존에 있던 this 다 빼준다.

  const handleClick = useCallback((id) => {
    let newTodoData = todoData.filter(data => data.id !== id)    
    console.log('newTodoData', newTodoData);
    // this.setState({todoData: newTodoData});
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));   
  }, [todoData]
  );

  
 
  // handleSubmit는 다른 state들도 이곳에 있기 때문에 옮기는 것 보다는 이곳에서 handleSubmit 자체를 Props로 내려주는것이 좋다.
  
  const handleSubmit = (e) => {
    e.preventDefault();
   
    let newTodo = {
      id: Date.now(),
      title: value, 
      completed: false
    };
   
    // this.setState({todoData: [...todoData, newTodo], value: ""});
    // Setter에서 이전 State를 가지고 오기 위해서는 인수에 함수(prev)를 사용할 수 있다.
    // prev -> 원래있던 todoData의 값표현해주는 함수
    setTodoData(prev => [...prev, newTodo]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo])); 
    setValue("");
  }
  
  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));  
  }

  //render() 지워주기                                 
   //클래스 컴포넌트에서는 render () 안에서 return 해야하지만 함수형 컴포넌트에서는 render()없이 바로 리턴 가능 
   return(                           
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">     
    {/* tailwindcss 적용위해 기존의 class지워주기 */}
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3"> 
          <h1 className="text-2xl">할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>


        <Lists todoData={todoData} setTodoData={setTodoData} handleClick={handleClick}/>    
        {/* // List에 Props 내려주기 */}
        {/* 사용할 부분 내려주기 todoData , setTodoData  */}

        <Form handleSubmit={handleSubmit} value={value} setValue={setValue}/>
      </div>
    </div>
  )
}

// State와 Props 

// State : 부모 컴포넌트에서 자녀 컴포넌트로 데이터를 보내는게 아닌 해당 컴포넌트 내부에서 데이터를 전달 할때 사용
// ex) 검색 창에 글을 입력할 때, 글이 변하는 것 -> State를 바꿈

// State는 변경 가능하다 -> mutable
// State가 변하면 re-render된다.

// Props :  Properties의 줄임말.
// 상속하는 부모 컴포넌트로부터 자녀 컴포넌트에 데이터 등을 전달하는 방법
// Props는 읽기 전용으로 자녀컴포넌트 입장에서는 변하지 않는다. -> immutable (부모에서 State 변경가능)

// 컴포넌트 분리의 장점 : 하나의 개별적인 컴포넌트를 다른 페이지에서도 사용할 수 있다. -> 재사용성 증가
// 각각의 파일에 개별적으로 컴포넌트가 있기 때문에 기능적으로 코드로 구분하기가 더 쉽다.

// 컴포넌트 분리에 정답인 방법은 없지만 최대한 재사용성이 높을 것 같은 방식으로 쪼개주면 된다.


// 구조 분해 할당이란? (Destructuring)

//배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을수있게하는 Javascript표현식

// ==> 클린코드를 위해서 사용하는 경우도 많다.


// -----------------------------------------------------------------

// Tailwind CSS 란 ?
// HTML 안에서 CSS 스타일을 만들 수 있게 해주는 CSS 프레임워크

//CSS프레임 워크란 ?
// 레이아웃 및 여러 컴포넌트 구성, 브라우저 호환성을 보장하는데 소요되는 시간을 최소화하기 위해 여러 웹 개발/디자인 프로젝트에 적용할 수 있는 CSS 파일 모음.
// 더 빠르게 애플리케이션을 스타일링 하는데 도움을 줍니다.

//CSS framework for react의 종류

// Material UI , React Bootstrap , Semantic UI , Ant Design , Materialize ..

// Tailwind CSS의 장점
// 부트스트랩과 비슷하게 m-1(margin 1), flex와 같이 미리 세팅된 Utility class를 활용하는 방식으로 HTML에서 스타일링을 할 수 있다.

// 그래서 빠른 스타일링 작업가능하고
// 클래스혹은 id 명을 작성하기 위한 고생을 하지 않아도된다.
// 유틸리티 클래스가 익숙해지는데 시간이 필요할 수 있지만 IntelliSense 플러그인이 제공되서 금방 익숙해질 수 있다.


// beautiful dnd -> drag&drop을 쉽게 해주는 모듈 

// <DragDropContext/>   --> 이 기능을 쓰고 싶은 항목을 감싸준다.
// <Droppable/>     --> drop을 할 수 있는 영역을 감싸준다.
// <Draggable/>     --> drag 할 수 있는 요소들을 개별적으로 감싸준다.


// useMemo를 이용한 결과 값 최적화

//Memoization 이란?
//비용이 많이 드는 함수 호출의 결과를 저장하고 동일한 입력이 다시 발생할때 캐시된 결과를 반환하여 컴퓨터프로그램의 속도를 높이는데 주로 사용되는 최적화 기술입니다.

// 컴포넌트내의 함수가 복잡한 연산을 수행하면 결과값을 리턴하는데 오래걸려 컴포넌트가 계속 리 렌더링 되면 연산을 수행하는데 많은 시간이 들고 성능에 안좋은 영향을 미친다. UI 지연 현상도 일어난다. 이것을 해결해주기위해 useMemo를 사용하는데 이것은 함수에 넘겨주는 값이 이전과 동일하면 컴포넌트가 리렌더링 되더라도 연산을 다시 하지 않고 이전 렌더링에서 저장해두었던 값을 재활용 한다.


