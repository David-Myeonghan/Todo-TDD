import React from "react";
import {
  cleanup,
  prettyDOM,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

describe("초기 렌더링", () => {
  test('인풋창이 렌더링 되고, "What needs to be done?" 문구가 placeholder에 보인다.', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    expect(inputElement).toBeInTheDocument();
  });
});

// describe("할 일 추가", () => {
//   test('"아침 먹기"를 입력후 엔터를 누르면 밥먹기 row 가 추가되고, items 갯수가 1개 증가한다. 남은 할일 아이템 숫자가 1 증가한다.', async () => {
//     render(<App />);
//
//     // ACT
//     const inputElement = screen.getByPlaceholderText("What needs to be done?");
//     await userEvent.type(inputElement, "Eat breakfast");
//     await userEvent.type(inputElement, "{enter}");
//
//     // ASSERT
//     const updatedItem = screen.getByText("Eat breakfast");
//     expect(updatedItem).toBeInTheDocument();
//   });
//
//   test('"점심 먹기"를 입력후 엔터를 누르면 밥먹기 row 가 추가되고, items 갯수가 1개 증가한다. 남은 할일 아이템 숫자가 1 증가한다.', async () => {
//     render(<App />);
//
//     // ACT
//     const inputElement = screen.getByPlaceholderText("What needs to be done?");
//     await userEvent.type(inputElement, "아침 먹기");
//     await userEvent.type(inputElement, "{enter}");
//
//     // ASSERT
//     const updatedItem = screen.getByText("아침 먹기");
//     expect(updatedItem).toBeInTheDocument();
//   });

// test('새로 고침시에도 작성한 아이템이 남아있다.', async () => {
//     render(<App/>);
//     // ACT
//     const inputElement = screen.getByPlaceholderText("What needs to be done?");
//     await userEvent.type(inputElement, '아침 먹기');
//     await userEvent.type(inputElement, '{Enter}');
//
//     await window.location.reload();
//
//     // ASSERT
//     const updatedItem = screen.getByText('아침 먹기');
//     expect(updatedItem).toBeInTheDocument();
// })
// });

// describe('할 일 수정 - 추가된 밥먹기를 "잠자기"로 변경하면 row 의 컨텐츠가 "잠자기"가된다', () => {
//   test("items을 더블클릭하면 item 창이 input으로 변경된다.", async () => {
//     render(<App />);
//     // ACT
//     const inputElement = screen.getByPlaceholderText("What needs to be done?");
//     await userEvent.type(inputElement, "아침 먹기");
//     await userEvent.type(inputElement, "{enter}");
//
//     const textElement = screen.getByText("아침 먹기");
//     await userEvent.dblClick(textElement);
//
//     // ASSERT
//     const inputElementArray = screen.getAllByRole(
//       "textbox",
//     ) as HTMLInputElement[];
//     expect(inputElementArray.length).toBe(2);
//
//     const hasTypedValue = inputElementArray.some(
//       (inputElement) => inputElement.value === "아침 먹기",
//     );
//     expect(hasTypedValue).toBe(true);
//     cleanup();
//   });
//
//   test("변경된 input 창의 텍스트를 수정후 엔터를 누르면 수정된 텍스트로 item 이 보인다.", async () => {
//     cleanup();
//
//     render(<App />);
//     // ACT
//     const inputElement = screen.getByPlaceholderText("What needs to be done?");
//     await userEvent.type(inputElement, "저녁 먹기");
//     await userEvent.type(inputElement, "{enter}");
//
//     const textElement = screen.getByText("아침 먹기");
//     await userEvent.dblClick(textElement);
//
//     // input value 수정
//     const typedInputElement = screen.getByDisplayValue("저녁 먹기");
//     await userEvent.clear(typedInputElement);
//     await userEvent.type(typedInputElement, "점심 먹기");
//     await userEvent.type(typedInputElement, "{enter}");
//
//     // ASSERT
//     // 수정된 값 확인
//     const changedText = screen.getByText("점심 먹기");
//     expect(changedText).toBeInTheDocument();
//   });
// });

describe("할 일 삭제", () => {
  test("할일 아이템 위에 마우스를 올려놓으면, 오른쪽에 X표가 표시된다.", async () => {
    render(<App />);

    // ACT
    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    await userEvent.type(inputElement, "저녁 먹기");
    await userEvent.type(inputElement, "{enter}");

    // ASSERT
    // const textElement = screen.getByText("저녁 먹기");
    expect(screen.queryByTestId("closeButton")).toBeNull(); // data-testid

    // Hover
    await userEvent.hover(screen.getByLabelText("button-container"));

    // getBy -> 요소 없으면 에러.
    // findBy -> 요소가 나타날 때까지 기다림. 요소 없으면 에러.
    // queryBy -> 요소가 없을 때 null. 에러 발생 X
    const closeButton = await screen.findByTestId("close-button");
    expect(closeButton).toBeInTheDocument();

    // Un-hover
    await userEvent.unhover(screen.getByLabelText("button-container"));
    // await new Promise((resolve) => setTimeout(resolve, 100)); // 이것도 사용가능하지만, 제대로된 걸 사용하자..

    await waitFor(() => {
      expect(screen.queryByTestId("close-button")).toBeNull(); // data-testid
    });
  });

  test("X표를 클릭하면 아이템이 삭제되고 할일 목록이 사라진다.", async () => {
    render(<App />);

    // Hover
    await userEvent.hover(screen.getByText("저녁 먹기"));

    // find close-button
    const closeButton = await screen.findByTestId("close-button");
    await userEvent.click(closeButton);

    // ASSERT
    expect(screen.queryByText("저녁 먹기")).toBeNull();
  });
});

describe("할 일 완료", () => {
  test("아이템 촤측 원(체크박스)을 클릭하면, 아이템 글자위에 취소선이 그어진다. (남은 할일 아이템 숫자가 1 감소한다.)", async () => {
    cleanup();
    render(<App />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    await userEvent.type(inputElement, "저녁 먹기");
    await userEvent.type(inputElement, "{enter}");

    const textElement = screen.getByText("저녁 먹기");
    expect(textElement).not.toHaveStyle("text-decoration: line-through");

    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);
    console.log(prettyDOM());

    expect(textElement).toHaveStyle("text-decoration: line-through");
  });

  // test("Clear completed를 클릭하면, 아이템 글자위에 취소선이 그어진다. 남은 할일 아이템 숫자가 1 감소한다.", () => {
  //   const inputElement = screen.getByRole("input");
  //   userEvent.type(inputElement, "밥먹기");
  //
  //   // Enter
  // });
});

// describe('할 일 필터', ()=> {

//   render(<App />);

//   test('Active 필터를 클릭하면 완료되지 않은 아이템만 보인다.', () => {
//     const inputElement = screen.getByRole('input');
//     userEvent.type(inputElement, '밥먹기');

//     // Enter
//   })

//   test('Completed 필터를 클릭하면 완료한 아이템만 보인다.', () => {
//     const inputElement = screen.getByRole('input');
//     userEvent.type(inputElement, '밥먹기');

//     // Enter
//   })

//   test('다시 All 필터를 클릭하면 모든 아이템이 보인다.', () => {
//     const inputElement = screen.getByRole('input');
//     userEvent.type(inputElement, '밥먹기');

//     // Enter
//   })

// })
