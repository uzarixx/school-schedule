import React, {FC} from 'react'
import styles from './Select.module.scss'

interface SelectWrapperTypes {
    options: { number: string; name?: string; } []
    onChange?: any
    date?: { day: string; month: string; time: string; }
    id?: number
}


const Select: FC<SelectWrapperTypes> = ({options, onChange, id, date}) => {
    const day = id === 0
    const month = id === 1
    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({...date, [day?'day':month?'month':'time']: e.target.value})
    }
    return (
        <select className={styles.SelectWrapper} onChange={onChangeSelect}>
            {options.map((el, i) =>
                <option key={i}>{el?.number || el?.name}</option>
            )}
        </select>
    )
}

export default Select;