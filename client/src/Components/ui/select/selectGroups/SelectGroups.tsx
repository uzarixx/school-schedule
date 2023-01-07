import React, {FC} from 'react'
import styles from './SelectGroups.module.scss'

interface SelectWrapperTypes {
    options: { name: string; group: string; } [];
    onChange?: any;
    group?: { group: string; groupName: string };
    groupValue?: string;
}


const SelectGroups: FC<SelectWrapperTypes> = ({options, onChange, group, groupValue}) => {
    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
       onChange({...group, group: e.target.value, groupName: e.target.selectedOptions[0].text})
    }
    return (
        <select className={styles.SelectWrapper} value={group?.group || groupValue} onChange={onChangeSelect}>
            {options?.map((el, i) =>
                <option value={el.group} key={i}>{el?.name}</option>
            )}
        </select>
    )
}

export default SelectGroups;