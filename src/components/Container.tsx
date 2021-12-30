import update from 'immutability-helper';
import React, { FC, useState, useCallback,useEffect } from 'react'
import  { Card }  from './Card'




export interface Item {
  id: number
  text: number
}

export interface ContainerState {
  cards: Item[]
}

export const Container: FC = () => {

   // const myObject = {id:0,text:0} ;
    const [inputValue, SetInputValue]= useState({x:0,enable:false});
     const [cards, setCards] = useState<any[]>([]);
     const [sGame, setSGame] = useState(false);

     let numbersArray:any = [];
     useEffect(() => {
       if(cards.length>0){
        setTimeout(() => {
          gameOver();
        }, 1000);

        
       }
      
    }, [cards]);

    // let cards: any = [{id:100,text:100}];
    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        )
       
      },
      [cards],
    )

      const updateInputValue = (evt: React.ChangeEvent<HTMLInputElement>)=> {
        if(parseInt(evt.currentTarget.value,10) > 1 && parseInt(evt.currentTarget.value,10) < 9){
          SetInputValue({x: parseInt(evt.currentTarget.value,10),enable:true }); 
        }
        else{
          alert("please Enter number Between 2 to 8");
        }
         
      }

      const startGame = () => {
     
       if(inputValue.enable===true){
        for(let j=0; j<inputValue.x*inputValue.x;j++){
          numbersArray[j]=[j];
        }
        numbersArray= shuffle(numbersArray);
          for(let i=0; i < numbersArray.length; i++){
            cards.push({id:numbersArray[i],text:numbersArray[i]});
            setCards(cards);   
          }
          setSGame(true);
        }
        console.log(cards)
      }
    
     // random  number generate
     function shuffle(array:any) {
      let currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle...
      while (currentIndex != 0) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    }

    // Checking the all conditions in end the game 
    const gameOver = () => {
      let count = 0;
     for(let k=0; k<=cards.length; k++){
      
       if(cards[k].id[0]===k){
        console.log(cards[k].id[0],k,"match")
         count++;
         if(count===cards.length){
           console.log("ok ok")
          alert("Congrats");
          setCards([]);
          SetInputValue({x:0,enable:false});
          setSGame(false);
          return;
        }
       }
       else{
         return;
       }

     }
      
    }

    const renderCard = (card: any, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      )
    }
    
    return ( 
      <div className='flex flex-col items-center w-full'>
        <div className='flex my-4 w-1/2 justify-evenly'>
            <button onClick={startGame} type="button">Statrt Game</button>
            <input onChange={updateInputValue} type="number" placeholder='Enter value B/w 2 to 8'/>
            
        </div>
      {sGame===true && <div className='flex flex-wrap' style={{ width:inputValue.x===2? '200px':inputValue.x===3? '300px':inputValue.x===4? '400px':inputValue.x===5? '500px':inputValue.x===6? '600px':inputValue.x===7? '700px':inputValue.x===8? '800px' :'auto' }}> 
      {cards.map((card, i) => renderCard(card, i) 
      
          )}</div> }
      </div>
    )
  }


