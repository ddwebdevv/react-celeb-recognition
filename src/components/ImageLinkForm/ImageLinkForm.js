import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div> 
            <p className='f3'>
                {'This Magic Brain will detect celebrities in pictures. Or check who do you look like.'}
            </p>
            <div className='center'>
                <div className='pa4 br3 shadow-5 form center'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} placeholder='link to image'/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit} >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;