import { Fragment } from 'react';

export default ( props )=>{

    return (

        <Fragment>

            <style jsx>
                {`
                    span.aw-container{
                        
                        width: 30px;
                        height: 30px;
                        position: relative;

                        border-radius: 50%;
                        background-color: snow;
                        // background-color: hotpink;
                        color: #1A1D1C;

                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        vertical-align: top;

                        top: 8px;
                        margin-left: 6px;

                    }

                    span.aw-text{
                        font-size: 10px;   
                        letter-spacing: 1px;
                    }

                    span.aw-x{             
                        font-weight: 300;
                    }

                    span.aw-count{
                        font-weight: 600;  
                    }

                `}
            </style>
            <span className="aw-container">
                <span className="aw-text aw-x">x</span>
                <span className="aw-text aw-count">{props.count}</span>
            </span>

        </Fragment>

    );

}