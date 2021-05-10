import { Card, CardContent, Typography } from "@material-ui/core"

const InfoBox = ({title,cases,total}) => {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* Title */}
                <Typography color="textSecondary" className="infoBox_title">
                    {title}
                </Typography>
                
                {/* Number of Cases */}
                <h2 className="infoBox_cases">{cases}</h2>

                {/* Number Total */}
                <Typography color="textSecondary" className="infoBox_total">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
