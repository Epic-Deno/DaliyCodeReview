/*
 * @Description: main description
 * @Author: zhang zhen
 * @Date: 2023-02-02 01:16:02
 * @LastEditors: zhang zhen
 * @LastEditTime: 2023-02-02 17:48:13
 * @FilePath: /react-ts-8wvsof/src/Keyboard.js
 */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './style/keyboard.css'

function Keyboard(prop, ref) {
  const { onChangeNumber } = prop;
  //  做一个支付键盘
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [newNumber, handleChangeNumber] = useState('');
  const onClickNumber = (value) => {
    if (newNumber.includes('.') && value === '.') {
      return;
    }
    let result = `${newNumber}${value}`;
    handleChangeNumber(result);
    onChangeNumber(result);
  };
    // 触发方法
    useImperativeHandle(ref, () => ({
      clean: () => {
        handleChangeNumber('');
      },
    }));
  /* 清除 */
  const cleanNumber = () => {
    if (newNumber.length == 0) {
      return;
    }
    let newValue = newNumber.slice(0, newNumber.length - 1);
    handleChangeNumber(newValue);
    onChangeNumber(newValue);
  };
  /* 提现 */
  const withdrawMoney = () => {
    alert(`当前提现¥ ${newNumber}元`)
  }
  return (
    <div className="keyboard">
      {/* 左侧数字区域 */}
      <div className="keyboard_numbers">
        <div className="keyboard_numbers_top">
          {numbers.map((i) => (
            <div
              className="keyboard_numbers_item"
              key={i}
              onClick={() => onClickNumber(i)}
            >
              {i}
            </div>
          ))}
        </div>
        {/* 底部数字区域 */}
        <div className="keyboard_numbers_bottom">
          <div
            className="keyboard_numbers_bottom_item"
            onClick={() => onClickNumber(0)}
          >
            0
          </div>
          <div
            className="keyboard_numbers_bottom_item"
            onClick={() => onClickNumber('.')}
          >
            .
          </div>
        </div>
      </div>
      {/* 左侧按钮区域 */}
      <div className="keyboard_options">
        <div className="keyboard_options_item" onClick={() => cleanNumber()}>
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4443"
            width="64"
            height="64"
          >
            <path
              d="M960 736V288a64 64 0 0 0-64-64H340.064c-13.92 0-21.536 7.296-21.536 7.296L71.648 492.48c-8.096 8.128-7.648 18.4-7.648 18.4 0 14.144 8.544 21.856 8.544 21.856l244.16 259.072c6.304 5.984 13.056 8.704 20.224 8.128H896a64 64 0 0 0 64-64z m-216.224-359.776a32 32 0 0 1 0 45.28l-226.272 226.24a32 32 0 0 1-45.248-45.248l226.24-226.24a32 32 0 0 1 45.28 0z m-226.272 0l226.24 226.272a32 32 0 0 1-45.248 45.248l-226.24-226.24a32 32 0 0 1 45.248-45.248zM854.816 735.36h-498.56l-210.112-224 210.976-222.24 1.344-1.28h496.352a32 32 0 0 1 32 32v383.52a32 32 0 0 1-32 32z"
              fill="#000000"
              p-id="4444"
            ></path>
          </svg>
        </div>
        {
          Number(newNumber) > 0 && Number(newNumber) <= 3000 ? <div className='keyboard_options_item able' onClick={() => withdrawMoney()}>提现</div> : <div className='keyboard_options_item disable'>提现</div>
        }
        
      </div>
    </div>
  );
}

export default forwardRef(Keyboard);
