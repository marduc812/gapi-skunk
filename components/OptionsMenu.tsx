import React from 'react'
import { OptionsMenuProps } from '@/lib/types'

const OptionsMenu: React.FC<OptionsMenuProps> = ({ options, setOptions, visibleMenu, setVisibleMenu }) => {

  const handleOptionClick = (optionName: string) => {
    const updatedOptions = options.map((option) => {
      if (option.name === optionName) {
        return { ...option, selected: !option.selected };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  const enableAllOptions = () => {
    const updatedOptions = options.map((option) => {
      return { ...option, selected: true };
    });
    setOptions(updatedOptions);
  };

  const disableAllOptions = () => {
    const updatedOptions = options.map((option) => {
      return { ...option, selected: false };
    });
    setOptions(updatedOptions);
  };

  const selectedCount = options.filter(option => option.selected).length;
  const totalCount = options.length;

  return (
    <div className='flex flex-col w-full items-center'>
      <div className='flex flex-row justify-around w-full md:w-full lg:w-3/4 xl:w-1/2'>
        <button className='mt-5 bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded' onClick={disableAllOptions}>Deselect All</button>
        <button className='mt-5 bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded' onClick={enableAllOptions}>Select All</button>
        <button className='mt-5 bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded' onClick={() => setVisibleMenu(!visibleMenu)}>{visibleMenu ? 'Hide Options' : 'Select Tests'}</button>
      </div>


      <div className='flex flex-col border border-black rounded-md m-5 p-5 items-center w-full'>

        <div className='flex flex-row justify-center items-center w-1/2'>
          <p className='text-xl font-bold mr-5'>Tests selected: </p>
          <p className='text-xl'>{selectedCount}/{totalCount}</p>
        </div>

        {
          visibleMenu && (
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-5'>
              {options.map((option) => {

                const classes = option.selected ? 'text-lg font-bold' : 'text-lg font-bold text-gray-400';
                let catColor = '';

                if (!option.selected) {
                  catColor = 'text-gray-500 bg-gray-100'
                } else {
                  if (option.category === 'Maps') {
                    catColor = 'text-blue-700 bg-blue-100'
                  } else if (option.category === 'Routes') {
                    catColor = 'text-red-700 bg-red-100'
                  } else if (option.category === 'Places') {
                    catColor = 'text-green-700 bg-green-100'
                  } else if (option.category === 'Google Cloud') {
                    catColor = 'text-yellow-700 bg-yellow-100'
                  }
                }

                return (
                  <div key={option.name} className='flex flex-col hover:cursor-pointer p-2' onClick={() => handleOptionClick(option.name)}>
                    <h2 className={classes}>{option.name}</h2>
                    <div className='text-sm w-full flex flex-row justify-start'>
                      <h4 className={`p-1 rounded ${catColor}`}>{option.category}</h4>
                    </div>
                  </div>
                )
              }
              )}
            </div>
          )
        }

      </div>


    </div>
  )

}

export default OptionsMenu