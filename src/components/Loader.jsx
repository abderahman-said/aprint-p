import React from 'react'
import { Grid } from "react-loader-spinner";

const Loader = ({width}) => {
    return (
        <div style={{ width: "20%" }} className='m-auto d-flex justify-content-center align-items-center'>
            <Grid
                height="80"
                width="80"
                color="#1E96FC "
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{width : width}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loader