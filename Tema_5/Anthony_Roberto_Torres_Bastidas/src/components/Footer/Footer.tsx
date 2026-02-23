import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.mainText}>
                    Cinema UNIR - Your gateway to the world of movies.
                </p>
                <p className={styles.copyright}>
                    {'Copyright © '}
                    <a className={styles.link} href="https://unir.net/">
                        UNIR
                    </a>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
