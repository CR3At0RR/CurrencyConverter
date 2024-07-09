import { React, useState } from 'react'
import { Select } from '@chakra-ui/react'
import '../Components/CurrencyDropdown.css'

const CurrencyDropdown = ({items,fun}) => {
    const fromSelect = (id)=>{
        fun(id)
    }

    return (
        <Select m="1%"
            className='currencySelect'
            placeholder='Select Your Currency'
            onChange={(e) => fromSelect(e.target.value)}
        >
            {items.map(item => (
                <option key={item.currencyCode} value={item.currencyCode}>{item.currencyName}</option>
            ))}
        </Select>
    )
}

export default CurrencyDropdown