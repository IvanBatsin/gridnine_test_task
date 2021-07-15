import React from 'react';
import './filterMenu.scss';

import { UseFlightsContext } from '../../context';

import { Checkbox } from '../checkbox/Checkbox';
import { Radio } from '../radio/Radio';
import { Input } from '../input/Input';
import { AllFilers, SortTypes, SortTypesByPrice, SortTypesByTransfer } from '../../types';

interface FilterMenuProps {
  show: boolean,
  closeFilters: () => void
}

export const FilterMenu: React.FC<FilterMenuProps> = ({show, closeFilters}) => {
  const { allCarriers, showFlights, sortingFlights } = UseFlightsContext();
  const [order, setOrder] = React.useState<SortTypes>();
  const [carriers, setCarriers] = React.useState<string[]>([]);
  const [transfer, setTransfer] = React.useState<SortTypesByTransfer>();
  const [prices, setPrices] = React.useState<{min: string, max: string}>({
    max: '',
    min: ''
  });

  const handleChooseOrder = (type: SortTypes): void => {
    setOrder(type);
  }

  const handleAddRemoveCarrier = (value: string): void => {
    if (carriers?.includes(value)) {
      setCarriers(carriers.filter(item => item !== value));
      return;
    }

    setCarriers(prevState => ([...prevState, value]));
  }

  const handleSetPrices = (value: string, type: SortTypesByPrice): void => {
    setPrices(prevState => {
      return {
        max: type === 'max' ? value : prevState.max,
        min: type === 'min' ? value : prevState.min
      }
    });
  }

  const handleChooseTransfer = (value: string): void => {
    setTransfer(prevState => prevState === value as SortTypesByTransfer ? undefined : value as SortTypesByTransfer);
  }

  React.useEffect(() => {
    const sortObj: AllFilers = {
      carrier: carriers.length > 0 ? carriers : undefined,
      maxPrice: !isNaN(parseInt(prices.max)) ? parseInt(prices.max) : undefined,
      minPrice: !isNaN(parseInt(prices.min)) ? parseInt(prices.min) : undefined,
      order: order ? order : undefined,
      transfer: transfer ? transfer : undefined
    };
    sortingFlights!(sortObj);
  }, [prices, carriers, order, transfer]);

  const cls = show ? 'filter_menu' : 'filter_menu open'

  return (
    <div className={cls}>
      <div onClick={closeFilters} className="close_filters">&times;</div>
      <div className="sort">
        <h5>Сортировать</h5>
        <Radio attr="desc" onChange={handleChooseOrder} label="- по возрастанию цены" checked={order === 'desc'}/>
        <Radio attr="asc" onChange={handleChooseOrder} label="- по убыванию цены" checked={order === 'asc'}/>
        <Radio attr="duration" onChange={handleChooseOrder} label="- по времени в пути" checked={order === 'duration'}/>
      </div>
      <div className="filter">
        <h5>Фильтровать</h5>
        <Checkbox onClick={handleChooseTransfer} checked={transfer === 'transfer'} value="transfer" label="- одна пересадка"/>
        <Checkbox onClick={handleChooseTransfer} checked={transfer === 'without'} value="without" label="- без пересадок"/>
      </div>
      <div className="price">
        <h5>Цена</h5>
        <div className="input-group">
          <label>От</label>
          <Input onChange={handleSetPrices} attr="min" value={prices.min} min={0} type="number"/>
        </div>
        <div className="input-group">
          <label>До</label>
          <Input onChange={handleSetPrices} attr="max" value={prices.max} min={0} type="number"/>
        </div>
      </div>
      <div className="companies">
        <h5>Авиакомпании</h5>
        <ul>
          {allCarriers?.map(carrier => {
            return <li key={carrier}><Checkbox onClick={handleAddRemoveCarrier} value={carrier} label={carrier}/></li>
          })}
        </ul>
      </div>
      <div className="result">Найдено ({showFlights?.length})</div>
    </div>
  )
}