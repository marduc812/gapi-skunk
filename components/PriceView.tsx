import React from 'react'
import { PriceType } from '@/lib/types';

const PriceView : React.FC<PriceType> = ( {price} )  => {

    const priceOptions = price.split('|');

  return (
    <div className='flex flex-row'>
        {
            priceOptions.map((priceOption) => {
                return (
                    <p key={`${priceOption}-view`} className='text-sm bg-green-100 text-green-700 m-2 p-1 rounded'> {priceOption} </p>
                )
            })
        }
    </div>
  )
}

export default PriceView