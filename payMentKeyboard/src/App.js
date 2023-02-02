/*
 * @Description: 键盘区域
 * @Author: zhang zhen
 * @Date: 2023-02-02 01:16:02
 * @LastEditors: zhang zhen
 * @LastEditTime: 2023-02-02 17:50:56
 * @FilePath: /react-ts-8wvsof/src/App.js
 */
import React, { useState, useRef } from 'react';
import './style.css';
import Keyboard from './Keyboard.js';

export default function App() {
  const [number, changeNumber] = useState(''); // 显示的金额
  const [numberPosition, changeNumberPosition] = useState(''); // 位数
  const [remainingNum, changeRemainingNum] = useState(1000); // 剩余免费的额度
  const [rate, changeRate] = useState(0); // 要支付的手续费
  const keyboardRef = useRef(); // 键盘组件
  const handleChangeNumber = (value) => {
    changeNumber(value);
    // 1000 千 四位
    // 10000 万 五位
    // 100000 十万 六位
    // 1000000 百万 七位
    // 10000000 千万 八位
    // 去除小数点 之前的位数
    const numName = {
      4: '千',
      5: '万',
      6: '十万',
      7: '百万',
      8: '千万',
      9: '亿'
    };
    let numLen = value.split('.')[0].length
    let nameStr = numName[numLen] || '' // 转换的中文
    changeNumberPosition(nameStr)
    // 字符串转number
    let remainNum = 1000 - Number(value);
    if (remainNum < 0) { // 金额大于等于一千
      changeRemainingNum(remainNum)
      let newRemainNum = (Number(value) - 1000) * 0.01
      changeRate(newRemainNum)
    } else {
      changeRate(0)
      changeRemainingNum(remainNum)
    }
     
  };
  /* 清除数据 */
  const handleCleanNumbers = () => {
    changeNumber('')
    changeRemainingNum(1000)
    changeRate(0)
    changeNumberPosition('')
    // 子组件也需要清除
    keyboardRef.current.clean() // 清除子组件
  }

  return (
    <div>
      <h1>支付键盘</h1>
      <div className="numbers">
        {/* 千、万、百万 */}
        <div className={numberPosition ? 'numbers-position-show' : 'numbers-position'}>{numberPosition}</div>
        <div className="numbers-info">
          <span className="flag">¥</span>
          <span>{number}</span>
          { number.length > 0 ? <svg onClick={() => handleCleanNumbers()} t="1675330089023" className="cleanIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2867" width="64" height="64"><path d="M512 1024a512 512 0 1 1 512-512 512.520855 512.520855 0 0 1-512 512z m0-971.914547a459.914547 459.914547 0 1 0 459.914547 459.914547A460.435402 460.435402 0 0 0 512 52.085453z" fill="#231815" p-id="2868"></path><path d="M660.703967 674.76704a26.042726 26.042726 0 0 1-18.750763-7.812818l-281.001017-286.46999a26.042726 26.042726 0 0 1 0-36.980671 26.042726 26.042726 0 0 1 36.720244 0l281.001018 286.469989a26.042726 26.042726 0 0 1-18.490336 44.272635z" fill="#231815" p-id="2869"></path><path d="M376.577823 671.641913a26.042726 26.042726 0 0 1-18.490336-7.812818 26.042726 26.042726 0 0 1 0-36.720245l286.46999-281.001017a26.042726 26.042726 0 0 1 36.720244 0 26.042726 26.042726 0 0 1 0 36.980672l-286.46999 281.001017a26.042726 26.042726 0 0 1-18.229908 7.552391z" fill="#231815" p-id="2870"></path></svg> : '' }
        </div>
        {/* 0.001， 剩余金额  */}
        {remainingNum >= 0 ? <div className="numbers-desc">剩余免费额度还有¥ {remainingNum}元， 超出部分收取0.1%的手续费</div> : ''}
        {/* 预计收取手续费 元 */}
        {rate > 0 && remainingNum > -3000 ? <div className="numbers-desc">预计收取手续费¥ {rate}元</div> : ''}
        {/* 超过可用余额¥ 3000.00 */}
        {remainingNum < -3000 ? <div className="numbers-desc red-desc">超过可用余额¥ 3000.00元</div> : ''}
      </div>
      <Keyboard onChangeNumber={handleChangeNumber} ref={keyboardRef}/>
    </div>
  );
}
