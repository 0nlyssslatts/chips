# Чипсы

## Инструкцию по запуску
```
git clone https://github.com/0nlyssslatts/chips.git
cd chips
npm install
```
- Запуск dev сборки
  
  `npm run start`
- Запуск prod сборки
  ```
  npm run build:prod
  npm run preview
  ```

## Описание
В данном проекте был реализован компонент, отображающий список чипсов - ChipsList. Для его реализации я использовал _compound component_ подход, который позволяет создавать более гибкие и переиспользуемые UI-компоненты, разбивая их на несколько связанных подкомпонентов. 

Реализована функциональность:
  1. Элементы, которые не поместились в одну строчку, можно увидеть в попапе, кликнув на соответствующую кнопку
  2. Список подстраивается под изменение размеров ширины экрана
  3. Возможность выбора чипса по клику
  4. Компонент может быть переиспользован
  5. Чипс может быть использован отдельно от списка
  6. Также предусмотрен кейс, при котором чипс слишком длинный, поэтому текст вынесен в тултип при наведении
---

Возможные юзкейсы представлены в App.tsx.

<div align="center">
  <img src="https://github.com/user-attachments/assets/cde214d3-ab3f-47c8-8125-1cbcf5904a5b"></img>
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/f96310c7-a2e0-4473-9a44-c541319f5933"></img>
</div>

 ---

Для проекта была использована **кастомная webpack сборка** :)

<div align="center">
  <img src="https://github.com/user-attachments/assets/07214c40-0b5e-411c-89a4-26340e52adb9"></img>
</div>

--- 

<div align="center">
  <img src="https://github.com/user-attachments/assets/264a74dd-0c8f-433f-83d0-97b4c7a2dd1f"></img>
</div>
