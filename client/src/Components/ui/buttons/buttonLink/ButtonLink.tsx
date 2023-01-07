import React, {FC} from 'react'
import styles from './ButtonLink.module.scss'

interface ButtonLinkTypes {
    link: string;
    text: string;
}

const ButtonLink: FC<ButtonLinkTypes> = ({link, text}) => {
    return (
        <a className={styles.Link} href={link} target="_blank">{text}</a>
    )
}

export default ButtonLink