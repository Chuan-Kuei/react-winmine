# React-Winmine

---

[![Build Status](https://travis-ci.org/Chuan-Kuei/react-winmine.svg?branch=master)](https://travis-ci.org/Chuan-Kuei/react-winmine)

Classic windows minesweeper game for React.

---

## Installation and usage

```
npm install git://github.com/Chuan-Kuei/react-winmine.git
```

And then

```
import React from "react";
import WinMine from "react-winmine";
import "react-winmine/lib/react-winmine.css";

...
render() {
  return (
      <div>
        <WinMine />
      </div>
  )
}
```

---

## Props

| Name  |   Type   | Default | Description                                                              |
| :---: | :------: | :-----: | :----------------------------------------------------------------------- |
| level | {String} |  easy   | easy: 9x9, mine: 10<br>medium:16x16, mine:40<br>hard: 30x16, mine:99<br> |

---

## License

[MIT](https://github.com/Chuan-Kuei/react-winmine/blob/master/LICENSE)
