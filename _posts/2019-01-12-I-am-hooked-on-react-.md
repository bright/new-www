---
layout: post
title: I am hooked on React
image: /images/I-am-hooked-on-react/intro.jpg
author: patryk
hidden: true
tags: React JavaScript Hooks 
---

React introduced new feature which allow you to use state and other React feature without writing class, upcoming [Hooks](https://reactjs.org/docs/hooks-overview.html), a new proposal in React 16.7.0, which are going to blow your socks off and enable our function stateless component do more than even before!

![](/images/I-am-hooked-on-react/intro.jpg){: .center-image}

# Initial work #

The easiest way to setup environment for learning React with Hooks is run:

```
npx create-react-app my-app
cd my-app
npm start
```

Now, we have initialized React application.
Please, make sure to use the react-hooks you have installed proper version (the version which I will use is `16.7.0-alpha.2`) for today it’s the newest version of React.

If you want to know, which version are you using, please use command: 

```npm info react```

In case you want to update your react and react-dom please use command: 

```npm i react@next react-dom@next```

# React Hooks #

In this post we are going to focus on 3 basic Hooks in React:

```
useState
useEffect
useContext
```

React introduced even more, but they are more complicated and should be describe separately:

```
useReducer
useCallback
useMemo
useRef
useImperativeMethods
useLayoutEffect
```


### useState

Now, you can add state to functional component. We don't need write seperate class for that.
Let's create a simple counter state-less component and add first Hook.

```
export const Counter = () => {
   return (
       <div>
           <p>Counter value: </p>
           <button onClick={}>Increase</button>
           <button onClick={}>Decrease</button>
       </div>
   )
}
```

It's the simple Counter. Our counter will increase and decrease the value if user press Button `onClick` event.

The way it works, you can pass the initial state as a first argument, in my case it will be count equal 0. 
```
const [count, handleCount] = useState(0);
```
The useState hook returns an array. The first entry of the array is the the current value of the state, at this point it will be 0. The second entry of the array is a function to update the state.

Now, we can pass the current value of the state and function for update the state:

```
export const Counter = () => {
   const [count, handleCount] = useState(0);
   return (
       <div>
           <p>Counter value: {count}</p>
           <button onClick={() => {handleCount(count + 1)}}>Increase counter</button>
           <button onClick={() => {handleCount(count -1)}}>Decrease counter</button>
       </div>
   )
}
```


### useEffect

Hook as ability to avoid the side effects from function component. It’s is almost the same like know well componentDidMount.

So simply we import and will add it to our Counter, and pass anonymous function as a first argument:

```
const [count, handleCount] = useState(0);
const [checked, changeCheckbox] = useState(true)
useEffect(() => {
   console.log('hello from useEffect')
})
```

For now, the text `hello from useEffect` will render every time when we change the count value of change the value on checkbox (so every time when function flushing changes to the DOM including the first render). 

The real power of useEffect is that, we can pass a second optional argument, which is an array. The can specify, that we want to invoke this effect only it the situation when we change the count value.

```
useEffect(() => {
   console.log('hello from useEffect')
}, [count])
```

Now, the **useEffect will be call only in case that the state of the count will change**. Cool, right?

### useContext

Imagine, the problem is that the name and surname of user from index file is passed down as a prop to the components. 

We are going to create two additional function components: **Header** and **LoginInfo**. The components will only render the value passed as a `prop` from the `Dashboard`.

**Dashboard** which actually not use it, he just passed it down to **Header** which one use the value from user state and pass it as well to **LoginInfo** which also render the name of the user.
This approach is ok, but We have to pass user through a bunch of components (in our case Dashboard which don’t care about it). 

One way to make it looks better is to use `useContext` hook, to create a new context. It takes a default value, and return an object, that we’ll call Context with two properties. 
This has a `<Context.Consumer>` and `<Context.Provider>`. 
So let's create and export the Context object:

```
import React from 'react'
const Context = React.createContext()
export default Context
```

In our index app, we are importing the Context and wrap the whole main page component with `<Context.Provider>` and pass user value from state as a prop. Now, we have access in all of the 
Context consumer to the value from state and don’t need pass in through the components as a prop.

```
import React, { Component } from 'react';
import './App.css';
import { Dashboard } from "./Dashboard";
import Context from './Context'

class App extends Component {
   state = {
       user: 'John Doe'
   }
   render() {
       const {user} = this.state
       return (
           <Context.Provider value={user}>
               <Dashboard user={user}/>
           </Context.Provider>
       );
   }
}
export default App;
```
Right now, we can need to wrap our child to pass as a single function. We can do this to wrap this element in the function, which the first parameter is a value passed from the Provider (our index).
```
import React from 'react'
import LoginInfo from './LoginInfo'
import Context from './Context'
const Header = () => {
   return (
       <Context.Consumer>
           {(user) =>
               <div>
                   <h1>Welcome {user}</h1>
                   <LoginInfo user={user}/>
               </div>
           }
       </Context.Consumer>
   )
}

export default Header
```
Situation will be the same for the **LoginInfo**. We wrap the whole component inside the `<Context.Consumer>` and as a first argument of the function will be our user prop.
```
import React from 'react'
import Context from './Context'

const LoginInfo = () => {
   return (
       <Context.Consumer>
           {
               (user) => <h6>Logged as {user}</h6>

           }
       </Context.Consumer>
   )
}
```

In **LoginInfo** and **Header** now we have prop user as a value, so we can remove the unnecessary prop from the Dashboard which one don’t use it at all. 


# React Hooks restrictions #

Although it looks nicely, it's really good to know about Hooks:
* Hooks can be only called from React function (stateless) component,
* Hooks should be only called on the top level. Don't call then inside loops, conditions or nested functions.

The summarize of this post is that, the Hooks are great feature in React. Personally, I'm waiting when in will be available in stable release.
