/* eslint-disable  */

// function App() {
//   return (
//     <>
//       {/* <CardWrapper innerComponent={<TextComponent />} /> */}
//       <CardWrapper>
//         <TextComponent2 />
//       </CardWrapper>
//     </>
//   );
// }

// function TextComponent() {
//   return <div>hi there</div>;
// }

// function TextComponent2() {
//   return <div>hi there</div>;
// }

// const CardWrapper = ({ /* innerComponent, */ children }) => {
//   console.log(children);
//   return (
//     <>
//       {/* <div style={{ border: "1px solid black" }}>{innerComponent}</div> */}
//       <div style={{ border: "1px solid black" }}>{children}</div>
//     </>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
let counter = 5;
function App() {
  const [todos, setTodos] = useState([
    /*  { id: 1, title: "title1", description: "description1" },
    { id: 2, title: "title2", description: "description2" },
    { id: 3, title: "title3", description: "description3" },
    { id: 4, title: "title4", description: "description4" }, */
  ]);

  // function addTodo() {
  //   setTodos([
  //     ...todos,
  //     {
  //       id: counter,
  //       title: "title" + counter,
  //       description: "description" + counter,
  //     },
  //   ]);
  //   counter++;
  // }

  useEffect(() => {
    const fetchData = () => {
      fetch("https://sum-server.100xdevs.com/todos").then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      });
    };

    fetchData();
    setInterval(fetchData, 10000);
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))}
    </div>
  );
}

const Todo = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  );
};

export default App;

// import React, { useState } from "react";

// function App() {
//   const [name, setName] = useState("harkirat");

//   const changeName = (e) => {
//     e.preventDefault();
//     setName(Math.random().toString());
//   };

//   return (
//     <div>
//       <button onClick={changeName}>Update Name</button>
//       <Header title={name} />
//       <Header title="harkirat 2" />
//       <Header title="harkirat 3" />
//       <Header title="harkirat 4" />
//       <Header title="harkirat 5" />
//     </div>
//   );
// }

// const Header = React.memo(function Header({ title }) {
//   return <div>My name is {title}</div>;
// });

// export default App;

// import { useState } from "react";
//
// function App() {
//   return (
//     <div>
//       <HeaderWithButton />
//       <Header title={"harkirat 2"} />
//       <Header title={"harkirat 3"} />
//       <Header title={"harkirat 4"} />
//       <Header title={"harkirat 5"} />
//     </div>
//   );
// }

// const HeaderWithButton = () => {
//   const [name, setName] = useState("harkirat");

//   const changeName = (e) => {
//     e.preventDefault();
//     setName(Math.random().toString());
//   };
//   return (
//     <>
//       <button onClick={changeName}>Update Name</button>
//       <Header title={name} />
//     </>
//   );
// };

// const Header = ({ title }) => {
//   console.log("rendered");
//   return <div>My name is {title}</div>;
// };

// export default App;
