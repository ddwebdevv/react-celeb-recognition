import React from 'react';
import './FaceRecognition.css';

//rendering face boxes
const RenderBox = ({face}) => {
    console.log(face);
    const {name, leftCol, rightCol, topRow, bottomRow}  = face;
    return(
        <React.Fragment>
            <div className='nameAbove box'
                    style={{ top: topRow - 20,
                             left: leftCol                 
                            }} >
                {name} 
            </div>
            <div className='bounding-box box' 
                style={{ top: topRow,
                         right: rightCol,
                         left: leftCol,
                         bottom: bottomRow                   
                        }} >
            </div>
            
        </React.Fragment>
    );
}
     

const FaceRecognition = ({ imageUrl, faces }) => {
    const boxes = faces.map((face, index) => (
        <div key={index} >
            <RenderBox face={face} />
        </div>
    ));
    const names = faces.map((face, index) => (
        <div key={index} >
            <div className='nameAbove mt2' style={{ color: 'black' }} > {face.name}. </div>
        </div>
    ));
    return(
        <div className='center ma'> 
            <div className='absolute mt4'>
                <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />
                {boxes}
            </div>
            {names}
        </div>
    );
}

export default FaceRecognition;