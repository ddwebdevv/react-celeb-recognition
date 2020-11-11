import React from 'react';


const ErrorMess = ( {errMess} ) => {
    console.log(errMess.message);
    return(
        <div className='mt2' > 
            {errMess.message}
        </div>
    );
}

export default ErrorMess;