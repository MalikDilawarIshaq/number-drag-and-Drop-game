import update from 'immutability-helper';
import React, { FC, useState, useCallback, useEffect } from 'react';
import { Card } from './Card';

export interface Item {
  id: number;
  text: number;
}

export interface ContainerState {
  cards: Item[];
}

export const Container: FC = () => {
  // const myObject = {id:0,text:0} ;
  const [inputValue, SetInputValue] = useState({ x: 0, enable: false });
  const [cards, setCards] = useState<any[]>([]);
  const [sGame, setSGame] = useState(false);

  let numbersArray: any = [];
  useEffect(() => {

    if (cards.length > 0) {
      setTimeout(() => {
        gameOver();
      }, 1000);
    }
  }, [cards]);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [cards]
  );

  const updateInputValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
      SetInputValue({ x: parseInt(evt.currentTarget.value, 10), enable: true });
  };

  const startGame = () => {
    if (inputValue.enable === true) {
      for (let j = 0; j < inputValue.x * inputValue.x; j += 1) {
        numbersArray[j] = [j];
      }
      numbersArray = shuffle(numbersArray);
      const temp = [];
      for (let i = 0; i < numbersArray.length; i += 1) {
        temp.push({ id: numbersArray[i], text: numbersArray[i] });
        setCards(temp);
      }
      setSGame(true);
    }
  };

  // random  number generate
  function shuffle(array: any) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  // Checking the all conditions in end the game
  const gameOver = () => {
    let count = 0;
    for (let k = 0; k <= cards.length; k += 1) {
      if (cards[k].id[0] === k) {
        count += 1;
        if (count === cards.length) {
          alert('Congrats');
          setCards([]);
          SetInputValue({ x: 0, enable: false });
          setSGame(false);
          return;
        }
      } else {
        return;
      }
    }
  };

  const renderCard = (card: any, index: number) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
      />
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex my-4 w-1/2 justify-evenly">
        <button onClick={startGame} type="button">
          Statrt Game
        </button>
        <input
          onChange={updateInputValue}
          type="number"
          placeholder="Enter value B/w 2 to 8"
        />
      </div>
      {sGame === true && (
        <div
          className="flex flex-wrap"
          style={{
            width: `${inputValue.x * 100  }px`
          }}
        >
          {cards.map((card, i) => renderCard(card, i))}
        </div>
      )}
    </div>
  );
};
export default Container;
