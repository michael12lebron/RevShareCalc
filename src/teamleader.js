import { useState, useEffect } from 'react';
export function useTeamLeaderCalc() {
  const [teamMembers, setTeamMembers] = useState('');
  const [transactionsMember, setTransactionsMember] = useState('');
  const [percentageCappers, setPercentageCappers] = useState('');
  const [averageHomeSale, setAverageHomeSale] = useState('');
  const [averageCommission, setAverageCommission] = useState('');
  const [percentage, setPercentage] = useState('');
  const [totalTeamLeader, setTotalValueTeamLeader] = useState(0);

  useEffect(() => {
    const volume1 = teamMembers * transactionsMember * averageHomeSale * (averageCommission / 100);
    const cappers = percentageCappers / 100;

    const subtract1 = cappers * teamMembers * 7000;
    const subtract2 = (1 - cappers) * teamMembers * 14000;

    const totalVolume = volume1 - subtract1 - subtract2;
    const total = totalVolume * (percentage / 100);

    setTotalValueTeamLeader(Math.max(0, total));

  }, [teamMembers,transactionsMember,averageHomeSale,averageCommission,percentageCappers,percentage,]);

  return {
    teamMembers,
    setTeamMembers,
    transactionsMember,
    setTransactionsMember,
    averageHomeSale,
    setAverageHomeSale,
    averageCommission,
    setAverageCommission,
    percentageCappers,
    setPercentageCappers,
    percentage,
    setPercentage,
    totalTeamLeader,
  };
}
