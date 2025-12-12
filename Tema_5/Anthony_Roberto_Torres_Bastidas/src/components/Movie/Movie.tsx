import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Rating from '@mui/material/Rating';
import Button from "@mui/material/Button";
import styles from './Movie.module.css';

interface MovieProps {
    ImdbID: number;
    Title: string;
    Duration: string;
    Score: number;
    Type: string;
    Sinopsis: string;
    Poster: string;
}

const Movie: React.FC<MovieProps> = ({Title, Duration, Score, Sinopsis, Type, Poster}) => {
    const scoreValue = Score / 2;

    return (
        <Card className={styles.card}>
            <CardActionArea className={styles.cardActionArea}>
                <CardMedia
                    component="img"
                    className={styles.cardMedia}
                    image={Poster}
                    alt={Title}
                />
                <CardContent className={styles.cardContent}>
                    <Typography gutterBottom variant="h5" component="div">
                        {Title}
                    </Typography>

                    <div className={styles.ratingContainer}>
                        <Rating
                            value={scoreValue}
                            precision={0.5}
                            readOnly
                            size="small"
                        />
                        <Typography variant="body2" className={styles.scoreText}>
                            ({Score}/10)
                        </Typography>
                    </div>

                    <Typography variant="body2" className={styles.durationText}>
                        Duración: {Duration} | Tipo: {Type}
                    </Typography>

                    <Typography variant="body2" className={styles.sinopsisText}>
                        {Sinopsis}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <div className={styles.buttonContainer}>
                <Button variant="contained">Home</Button>
            </div>
        </Card>
    );
};

export default Movie;