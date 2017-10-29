# react-children-filter
react component that return filtered children


#### install
```
npm i --save react-children-filter 
```
#### example
```jsx
import React from 'react'
import { ChildrenFilter } from "react-children-filter";
...


//filter_type = [include_all, include_any, same, except_all, except_any]

<ChildrenFilter filter={['a','b'} type="same" filter_key="auth" >
  <MenuA auth={['a', 'c', 'd']}/>
  <MenuB auth={['b', 'd']}/>
  <MenuC auth={['b']}/>
  <MenuD auth={['a','c']}/>
  <MenuE auth={['c']}/>
  <MenuF auth={['b','a','c','d']}/>
  <MenuG auth={['a','b']}/>
</ChildrenFilter>
...
// will render only MenuG 

```

