import React from 'react';
import { getByRole, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

// 1. 추가 (밥먹기를 입력했을때 밥먹기 row 가 추가되고, items 갯수가 1개 증가한다)
// 2. 삭제 (추가된 row 를 삭제하면 items 갯수가 0되고 row가 하나도없다)
// 3. 수정 (추가된 밥먹기를 밥먹기2로 변경하면 row 의 컨텐츠가 밥먹기2가된다)

describe('초기 렌더링', () => {
  test('인풋창이 렌더링 되고, "What needs to be done?" 문구가 placeholder에 보인다.', () => {
  
    render(<App />);
    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    expect(linkElement).toBeInTheDocument();
  });
})

describe('할 일 추가', ()=> {

  render(<App />);
  test('"아침 먹기"를 입력후 엔터를 누르면 밥먹기 row 가 추가되고, items 갯수가 1개 증가한다. 남은 할일 아이템 숫자가 1 증가한다.', () => {
    const inputElement = screen.getByRole('input');
    userEvent.type(inputElement, '밥먹기');

    // Enter
  })

  test('"점심 먹기"를 입력후 엔터를 누르면 밥먹기 row 가 추가되고, items 갯수가 1개 증가한다. 남은 할일 아이템 숫자가 1 증가한다.', () => {
    const inputElement = screen.getByRole('input');
    userEvent.type(inputElement, '밥먹기');

    // Enter
  })
  
})

describe('할 일 수정 - 추가된 밥먹기를 "잠자기"로 변경하면 row 의 컨텐츠가 "잠자기"가된다', ()=> {
  render(<App />);
   test('items을 더블클릭하면 item 창이 input으로 변경된다.', () => {
    const inputElement = screen.getByRole('input');
    userEvent.type(inputElement, '밥먹기');

    // Enter
  })

  test('변경된 input 창의 텍스트를 수정후 엔터를 누르면 수정된 텍스트로 item이 보인다.', () => {
    const inputElement = screen.getByRole('input');
    userEvent.type(inputElement, '밥먹기');

    // Enter
  })
  
})

describe('할 일 삭제', ()=> {

  render(<App />);
  
  test('할일 아이템 위에 마우스를 올려놓으면, 오른쪽에 X표가 표시된다.', () => {
    const inputElement = screen.getByRole('input');
    userEvent.type(inputElement, '밥먹기');

    // Enter
  })
  test('X표를 클릭하면 아이템이 삭제되고 할일 목록이 사라진다.', () => {
    const inputElement = screen.getByRole('input');
    userEvent.type(inputElement, '밥먹기');

    // Enter
  })
  
})

describe('할 일 완료', ()=> {

  render(<App />);
  
  test('아이템 촤측 원을 클릭하면, 아이템 글자위에 취소선이 그어진다. 남은 할일 아이템 숫자가 1 감소한다.', () => {
    const inputElement = screen.getByRole('input');
    userEvent.type(inputElement, '밥먹기');

    // Enter
  })

  test('Clear completed를 클릭하면, 아이템 글자위에 취소선이 그어진다. 남은 할일 아이템 숫자가 1 감소한다.', () => {
    const inputElement = screen.getByRole('input');
    userEvent.type(inputElement, '밥먹기');

    // Enter
  })
  
})

describe('할 일 필터', ()=> {

  render(<App />);
  
  test('Active 필터를 클릭하면 완료되지 않은 아이템만 보인다.', () => {
    const inputElement = screen.getByRole('input');
    userEvent.type(inputElement, '밥먹기');

    // Enter
  })

  test('Completed 필터를 클릭하면 완료한 아이템만 보인다.', () => {
    const inputElement = screen.getByRole('input');
    userEvent.type(inputElement, '밥먹기');

    // Enter
  })

  test('다시 All 필터를 클릭하면 모든 아이템이 보인다.', () => {
    const inputElement = screen.getByRole('input');
    userEvent.type(inputElement, '밥먹기');

    // Enter
  })
  
})