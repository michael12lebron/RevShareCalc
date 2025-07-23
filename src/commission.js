import { useState, useEffect } from 'react';
export function useCommissionCalculator() {
const [averageHomePrice,setAverageHomePrice] = useState("");
const [averageTransactions,setAverageTransactions] = useState("");
const[averageVolume,setAverageVolume] = useState("");
const[totalValueCommission, setTotalValueCommission] = useState("");
const[capperType,setCapperType] = useState(false);
const[commissionPercent, setCommissionPercent] = useState("")

useEffect(() => {
    const volume = averageHomePrice*averageTransactions;
    setAverageVolume(volume);

    const commission = volume*(commissionPercent/100);

    const cap = capperType? 7000:14000;

    const totalCommission = commission-cap;

    setTotalValueCommission(totalCommission);
}, [averageHomePrice, averageTransactions, commissionPercent, capperType]);

return {
  averageHomePrice,
  setAverageHomePrice,
  averageTransactions,
  setAverageTransactions,
  commissionPercent,
  setCommissionPercent,
  capperType,
  setCapperType,
  averageVolume,
  totalValueCommission
};
}