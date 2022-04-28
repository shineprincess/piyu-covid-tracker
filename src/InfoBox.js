import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css'

// Coronavirus cases -> title
// +20000 -> cases
// 1.2M total -> total 

const InfoBox = ({title,cases, active ,isRed,total, ...props}) => {
    return (
        <>
             {/* InfoBoxes  title ="Coronavirus cases " */}
            <Card onClick={props.onClick} className={`infoBox ${active && 'infoBoxSelected'} ${isRed && 'infoBox--Red'}`}>
                <CardContent>
                    {/* Title  i.e. Coronavirus cases*/}
                    <Typography color="textSecondary" className="infoBox__title">
                        {title}
                    </Typography>

                    {/* Number of cases +120k */}

                    <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>{cases}</h2>

                    {/* 1.2M Total  */}

                    <Typography color="textSecondary" className="infoBox__total">
                        {total}   Total 
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default InfoBox
