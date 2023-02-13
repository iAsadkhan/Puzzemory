import React, { useState, useEffect, useRef } from "react";
import { v1 as uuid } from "uuid";
import ScoreBox from "./ScoreBox";

function Puzzemory() {
	const [starting, setStarting] = useState(6);
	const [delay, setDelay] = useState(false);
	const [lives, setLives] = useState(5);
	const [score, setScore] = useState(0);
	const [cardArray, setCardArray] = useState([]);
	let shuffledArray = [];

	useEffect(() => {
		looper();
	}, [starting]);

	function looper() {
		const finalArray = [];
		let imgNum = 1;
		let pair = 1;
		let pairId = uuid();
		for (let i = 0; i < starting * 2; i++) {
			finalArray.push({
				id: uuid(),
				position: i + 1,
				flip: false,
				hide: false,
				pairId: pairId,
				pointerEvents: true,
				img: `/images/pair-${imgNum}.jpg`,
			});
			pair++;
			if (pair > 2) {
				pair = 1;
				imgNum++;
				pairId = uuid();
			}
		}
		console.log(finalArray);
		//NOTE Randomize Array
		shuffledArray = finalArray
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
		console.log(shuffledArray);
		setCardArray(shuffledArray);
		
	}

	const [itemsFlipped, setItemsFlipped] = useState(0);
	const flippedIds = useRef([]);

	useEffect(() => {
		if (itemsFlipped === 2) {
			if (flippedIds.current[0].pairId !== flippedIds.current[1].pairId) {
				let newArray = cardArray.map((item) => {
					item.flip = false;
					return item;
				});
				setTimeout(() => {
					setCardArray(newArray);
					setItemsFlipped(0);
					flippedIds.current = [];
				}, 3000);

				{
					/* 
console.log("before loop")
        console.log(cardArray)
        
        let newArray= cardArray.map(item =>{
          if(item.id == flippedIds.current[0].id){
            item.flip = false;
            return item
          }
          else if(item.id == flippedIds.current[1].id){
            item.flip = false;
            return item
          }
          else{
            return item
          }
        })
        console.log("before loop")
        console.log(cardArray)
        //console.log(newArray)
        setTimeout(() => {
          setCardArray(newArray)
        }, 3000);
        console.log("useEffect Flipped")
        setLives( prevState => prevState - 1 )
          */
				}
			} else {
				let newArray = cardArray.map((item) => {
					if (item.id === flippedIds.current[0].id) {
						item.hide = true;
						item.pointerEvents = false;
						return item;
					} else if (item.id === flippedIds.current[1].id) {
						item.hide = true;
						item.pointerEvents = false;
						return item;
					} else {
						return item;
					}
				});

				setTimeout(() => {
					setCardArray(newArray);
					setItemsFlipped(0);
					flippedIds.current = [];
				}, 3000);
			}
			// console.log(items,)
		} else if (itemsFlipped > 2) {
			setItemsFlipped(0);
			flippedIds.current = [];
		}
	}, [itemsFlipped]);

	//NOTE Handle Click
	const handleClick = (e) => {
		let newArray = cardArray.map((item) => {
			if (item.id === e) {
				item.flip = true;
				item.pointerEvents = false;
				flippedIds.current.push(item);
				return item;
			} else {
				return item;
			}
		});
		setCardArray(newArray);

		console.log(flippedIds.current);
		setItemsFlipped((prevState) => prevState + 1);
		setDelay(true);
		setTimeout(() => {
			setDelay(false);
		}, 1000);
	};

	const [allFlipped, setAllFlipped] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setAllFlipped(false);
		}, 1000);
	}, []);

	return (
		<div className="main">
			<div className="main_header">
				<h1>Find the pair</h1>{" "}
			</div>
			<div className="game">
				{cardArray.map((item) => {
					return (
						<div
							onClick={() => handleClick(item.id)}
							key={item.id}
							style={{ pointerEvents: `${delay ? `none` : `all`}` }}
							className={` card ${item.hide ? `card-hide` : null} ${
								!item.pointerEvents ? `card-noPointerEvents` : null
							} `}
						>
							<div className="cardWrapper">
								<div
									className={`frontside ${
										allFlipped || item.flip ? `frontside-rotate` : null
									} `}
								>
									<p>?</p>
								</div>
								<div
									className={`backside ${
										allFlipped || item.flip ? `backside-rotate` : null
									} `}
								>
									<img src={item.img} alt="myphoto" />
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<div className="main_scorebox">
				<ScoreBox
					score={score}
					setScore={setScore}
					tries={lives}
					setTries={setLives}
					starting={starting}
					setStarting={setStarting}
				/>
			</div>
		</div>
	);
}
export default Puzzemory;
