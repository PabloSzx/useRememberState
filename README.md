# useRememberState

[![github-version](https://badgen.net/github/release/PabloSzx/useRememberState)](https://github.com/PabloSzx/useRememberState)
[![npm-version](https://badgen.net/npm/v/use-remember-state)](https://www.npmjs.com/package/use-remember-state)
[![install-size](https://badgen.net/packagephobia/install/use-remember-state)](https://www.npmjs.com/package/use-remember-state)
[![publish-size](https://badgen.net/packagephobia/publish/use-remember-state)](https://www.npmjs.com/package/use-remember-state)

React Hook designed to extend the **useState** hook using **localStorage** as the persistance method on the browser, ready for **TypeScript** environments too.

## Installation

```bash
yarn add use-remember-state
```

or

```bash
npm install --save use-remember-state
```

## Why

When you use **useState** you need to give a _default value_, usually it's just used as a placeholder, but what if you want that value to be data you already put before?, the common solution is to use the _default value_ calling **localStorage.getItem(_name_)**, but of course you need to call **localStorage.setItem(_name_, _value_)** before, and this call should be handled everytime the value you want to save is changed. And you have to keep in mind that if you have **SSR** implemented, there is no **localStorage** on the server, so you need fallbacks, so clearly it just becomes a nightmare and tons of repetitive code.

All that problem is solved using the custom hook **useRememberState**

## Usage

The return values from the hook are exactly the same as **useState**, but the arguments should be first a **consistent name** which is going to be used as **key** for **localStorage**, and after that a **default value**, which is going to be used as fallback for the first time render or server side rendering.

```tsx
import React, { FunctionComponent } from 'react';
import { useRememberState } from 'use-remember-state';

const HelloWorld: FunctionComponent = () => {
  const [data, setData] = useRememberState('HelloWorldInput', '');

  return (
    <div>
      <p>This input remembers the input after every reload</p>
      <input
        value={data}
        onChange={({ target: { value } }) => {
          setData(value);
        }}
      />
    </div>
  );
};
```

Keep in mind that the name should be **unique** around the app.

For server side rendering the default value is only going to be used for the first render, but after the component is mounted on the browser, it will try to fetch again to **localStorage** looking for the data.

### SSR

If you still have some problems with inconsistencies between server and client side, like _prop 'className' did not match_, you can use an optional third argument:

- useRememberState(_name_, _defaultValue_, **true**)

## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
