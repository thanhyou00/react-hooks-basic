import { useEffect, useState } from "react";
import queryString from 'query-string'
import "./App.scss";
import Pagination from "./components/Pagination";
import PostList from "./components/PostList";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import PostFiltersForm from "./components/PostFiltersForm";
import Clock from "./components/Clock";
import BetterClock from "./components/BetterClock";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "ReactJS" },
    { id: 2, title: "Spring boot" },
    { id: 3, title: "React Native" },
  ]);
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page :1,
    _limit : 10,
    _totalRows : 1
  });
  const [filters, setFilters] = useState({
    _limit : 10,
    _page : 1
  })
  const [showClock, setShowClock] = useState(true)
  useEffect(() => {
    async function fetPostList() {
      try {
        const paramString = queryString.stringify(filters); // convert object to string
        const requestUrl =`http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch post list', error.message);
      }
    }
    fetPostList();
  },[filters]);

  function handlePageChange(newPage){
    console.log('New page : ', newPage);
    setFilters({
      ...filters,
      _page : newPage
    })
  }
  function handleClickTodo(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }
  function handleTodoFormSubmit(formValue) {
    console.log("Form submit ", formValue);
    // add new todo to current to do list
    const newTodo = {
      id: todoList.length + 1,
      ...formValue,
    };
    const newTodoList = [...todoList]; // cause replace instead of merge
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }
  function handleFilterChange(newFilters) {
    console.log('New filters : ', newFilters);
    setFilters({
      ...filters,
      _page :1,
      title_like: newFilters.searchTern,
    })
  }


  return (
    <div className="app">
      <h1>ReactJS hooks - PostList</h1>
      {showClock && <Clock />}
      <BetterClock />
      <button onClick={()=>setShowClock(!showClock)}>Show/Hide Clock</button>
      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleClickTodo} /> */}
      <PostFiltersForm onSubmit={handleFilterChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
