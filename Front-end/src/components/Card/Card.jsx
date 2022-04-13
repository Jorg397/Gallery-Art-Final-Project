import React from 'react'
import s from "./Card.module.css"
export default function Card() {
  return (
    <div className='container'>

    
    <div className='grid grid-cols-3'>
    <div className={s.card} style={{background: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/The_Scream_by_Edvard_Munch%2C_1893_-_Nasjonalgalleriet.png/640px-The_Scream_by_Edvard_Munch%2C_1893_-_Nasjonalgalleriet.png)", backgroundSize:"cover"}}>
        <div className={s.cardbody}>
            <h1 className={s.cardtitle}>UNDER THE BRIDGE</h1>
            <p className={s.cardsub}>Serie/ 1 </p>
            <p className={s.cardmed}>150x150 cm</p>
            <p className={s.cardcat}>Paisaje, Minimalista.</p>
            <button className={s.cardbtn}>Agregar al carrito</button>
            <h2 className={s.cardprice}>$500.00</h2>
        </div>
    </div>







{/*     
    <div className={s.card} style={{background: "url(https://media.admagazine.com/photos/618a6acbcc7069ed5077ca7f/master/w_3000,h_2122,c_limit/68704.jpg)", backgroundSize:"cover"}}>
        <div className={s.cardbody}>
            <h1 className={s.cardtitle}>UNDER THE BRIDGE</h1>
            <p className={s.cardsub}>Serie/ 1 </p>
            <p className={s.cardmed}>150x150 cm</p>
            <p className={s.cardcat}>Paisaje, Minimalista.</p>
            <button className={s.cardbtn}>Agregar al carrito</button>
            <h2 className={s.cardprice}>$500.00</h2>
        </div>
    </div>
        <div className={s.card} style={{background: "url(https://media.admagazine.com/photos/618a6acbcc7069ed5077ca7f/master/w_3000,h_2122,c_limit/68704.jpg)", backgroundSize:"cover"}}>
        <div className={s.cardbody}>
            <h1 className={s.cardtitle}>UNDER THE BRIDGE</h1>
            <p className={s.cardsub}>Serie/ 1 </p>
            <p className={s.cardmed}>150x150 cm</p>
            <p className={s.cardcat}>Paisaje, Minimalista.</p>
            <button className={s.cardbtn}>Agregar al carrito</button>
            <h2 className={s.cardprice}>$500.00</h2>
        </div>
    </div>
    <div className={s.card} style={{background: "url(https://media.admagazine.com/photos/618a6acbcc7069ed5077ca7f/master/w_3000,h_2122,c_limit/68704.jpg)", backgroundSize:"cover"}}>
        <div className={s.cardbody}>
            <h1 className={s.cardtitle}>UNDER THE BRIDGE</h1>
            <p className={s.cardsub}>Serie/ 1 </p>
            <p className={s.cardmed}>150x150 cm</p>
            <p className={s.cardcat}>Paisaje, Minimalista.</p>
            <button className={s.cardbtn}>Agregar al carrito</button>
            <h2 className={s.cardprice}>$500.00</h2>
        </div>
    </div>
    <div className={s.card} style={{background: "url(https://media.admagazine.com/photos/618a6acbcc7069ed5077ca7f/master/w_3000,h_2122,c_limit/68704.jpg)", backgroundSize:"cover"}}>
        <div className={s.cardbody}>
            <h1 className={s.cardtitle}>UNDER THE BRIDGE</h1>
            <p className={s.cardsub}>Serie/ 1 </p>
            <p className={s.cardmed}>150x150 cm</p>
            <p className={s.cardcat}>Paisaje, Minimalista.</p>
            <button className={s.cardbtn}>Agregar al carrito</button>
            <h2 className={s.cardprice}>$500.00</h2>
        </div>
    </div>
    <div className={s.card} style={{background: "url(https://media.admagazine.com/photos/618a6acbcc7069ed5077ca7f/master/w_3000,h_2122,c_limit/68704.jpg)", backgroundSize:"cover"}}>
        <div className={s.cardbody}>
            <h1 className={s.cardtitle}>UNDER THE BRIDGE</h1>
            <p className={s.cardsub}>Serie/ 1 </p>
            <p className={s.cardmed}>150x150 cm</p>
            <p className={s.cardcat}>Paisaje, Minimalista.</p>
            <button className={s.cardbtn}>Agregar al carrito</button>
            <h2 className={s.cardprice}>$500.00</h2>
        </div>
    </div>
    <div className={s.card} style={{background: "url(https://media.admagazine.com/photos/618a6acbcc7069ed5077ca7f/master/w_3000,h_2122,c_limit/68704.jpg)", backgroundSize:"cover"}}>
        <div className={s.cardbody}>
            <h1 className={s.cardtitle}>UNDER THE BRIDGE</h1>
            <p className={s.cardsub}>Serie/ 1 </p>
            <p className={s.cardmed}>150x150 cm</p>
            <p className={s.cardcat}>Paisaje, Minimalista.</p>
            <button className={s.cardbtn}>Agregar al carrito</button>
            <h2 className={s.cardprice}>$500.00</h2>
        </div>
    </div>
    <div className={s.card} style={{background: "url(https://media.admagazine.com/photos/618a6acbcc7069ed5077ca7f/master/w_3000,h_2122,c_limit/68704.jpg)", backgroundSize:"cover"}}>
        <div className={s.cardbody}>
            <h1 className={s.cardtitle}>UNDER THE BRIDGE</h1>
            <p className={s.cardsub}>Serie/ 1 </p>
            <p className={s.cardmed}>150x150 cm</p>
            <p className={s.cardcat}>Paisaje, Minimalista.</p>
            <button className={s.cardbtn}>Agregar al carrito</button>
            <h2 className={s.cardprice}>$500.00</h2>
        </div>
    </div>
    <div className={s.card} style={{background: "url(https://media.admagazine.com/photos/618a6acbcc7069ed5077ca7f/master/w_3000,h_2122,c_limit/68704.jpg)", backgroundSize:"cover"}}>
        <div className={s.cardbody}>
            <h1 className={s.cardtitle}>UNDER THE BRIDGE</h1>
            <p className={s.cardsub}>Serie/ 1 </p>
            <p className={s.cardmed}>150x150 cm</p>
            <p className={s.cardcat}>Paisaje, Minimalista.</p>
            <button className={s.cardbtn}>Agregar al carrito</button>
            <h2 className={s.cardprice}>$500.00</h2>
        </div>
    </div>
     */}
    </div>
    </div>
  )
}
