import { useState } from 'react';
import { useCommissionCalculator } from './commission';
import { useTeamLeaderCalc } from './teamleader';
import RevshareGraph from './revsharegraph';
import { useRevShareCalc } from './revshare';

function Calculator() {
  const [showRevshare, setShowRevshare] = useState(false);
  const [showTeamLeader, setShowTeamLeader] = useState(false);

  const {
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
  } = useCommissionCalculator();

  const {
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
  } = useTeamLeaderCalc();

  const totalValueCommission2 = Math.max(0, totalValueCommission);
  const averageVolume2 = Math.max(0, averageVolume);

  const {
    activeLevel,
    setActiveLevel,
    level1Agents,
    setLevel1Agents,
    levelInputs,
    setLevelInputs,
    revshareValues,
    totalRevshare,
    unlockedLevels,
    handleLevelInputChange,
  } = useRevShareCalc();

  function numberInputChange(e, setter) {
    const value = e.target.value;
    setter(value === "" ? "" : Number(value));
  }

  return (
    <>
      <div className="top-of-page">
        <h1 className="title">My Wealth Calculator</h1>
        <p className="little-description">Welcome to my version of Realty of America's Wealth Calculator!</p>
        <img src="/images/roa-logo2-blue.png" alt="Realty of America" className="roa-logo" />

        {/*RevShare Graph*/}
        <div className="first-section">
          <div className="left-column">
            <div className="circle-graph">
              <h2>Earnings Graph</h2>
              <RevshareGraph commissionTotal={totalValueCommission2} revshareTotal={totalTeamLeader+totalRevshare} />
            </div>

            {/*Earnings Overview*/}
            <div className="earnings-overview">
              <h2> Earnings Overview</h2>
              <p>Comission Income: ${totalValueCommission2.toLocaleString()}</p>
              <p>Team Leader Income: ${totalTeamLeader.toLocaleString()}</p>
              <p>Revenue Share Income: ${totalRevshare.toLocaleString()}</p>
              <p>stuff</p>
              <p>stuff</p>
              <p>stuff</p>
              <p>stuff</p>
            </div>
          </div>

          {/*Commission Section*/}
          <div className="commission-income">
            <h2>Commission Income</h2>
            <hr className="divider" />
            <p> Are you a Half Capper of Full Capper?</p>
            <select
              value={capperType ? "half-capper" : "full-capper"}
              onChange={(e) => setCapperType(e.target.value === "half-capper")}
            >
              <option value="half-capper">Half Capper</option>
              <option value="full-capper">Full Capper</option>
            </select>
            <h3>Individual</h3>
            <p>What is your average home sales price?</p>
            <input type="range" min="0" max="5000000" value={averageHomePrice} onChange={(e) => setAverageHomePrice(Number(e.target.value))} />
            <div className="dollar-sign">
              <span className="dollar">$</span>
              <input type="number" placeholder="0" value={averageHomePrice} onChange={(e) => numberInputChange(e, setAverageHomePrice)} />
            </div>
            <p>How many transactions per years?</p>
            <input type="range" min="0" max="150" value={averageTransactions} onChange={(e) => setAverageTransactions(Number(e.target.value))} />
            <div className="transactions">
              <span className="transactions-sign">↹</span>
              <input type="text" placeholder="0" value={averageTransactions} onChange={(e) => numberInputChange(e, setAverageTransactions)} />
            </div>
            <h4>Volume per year: ${averageVolume2.toLocaleString()}</h4>
            <p>What is the average commission charged on one end of a deal?</p>
            <div className="percentage">
              <span className="percentage-sign">%</span>
              <input type="number" placeholder="0" value={commissionPercent} onChange={(e) => numberInputChange(e, setCommissionPercent)} />
            </div>
            <hr className="divider" />
            <h4>Total Value:</h4>
            <p>${totalValueCommission2.toLocaleString()}</p>
          </div>
        </div>

        <div className="second-section">

          {/*Team Leader Section*/}
          <div className="team-leader-section">
            <div className="toggle-row">
              <h3>Will you be a team leader?</h3>
              <label className="toggle">
                <input type="checkbox" checked={showTeamLeader} onChange={() => setShowTeamLeader(!showTeamLeader)} />
                <span className="slider-button"></span>
              </label>
            </div>

            {showTeamLeader && (
              <div>
                <hr className="divider" />
                <p>How many team members will you have?</p>
                <input type="number" placeholder="0" value={teamMembers} onChange={(e) => numberInputChange(e, setTeamMembers)} />
                <p>How many transactions will each team member close per year?</p>
                <input type="number" placeholder="0" value={transactionsMember} onChange={(e) => numberInputChange(e, setTransactionsMember)} />
                <p>What percentage of these team members are half cappers?</p>
                <input type="number" placeholder="0" value={percentageCappers} onChange={(e) => numberInputChange(e, setPercentageCappers)} />
                <p>What is the average home sales price?</p>
                <input type="number" placeholder="0" value={averageHomeSale} onChange={(e) => numberInputChange(e, setAverageHomeSale)} />
                <p>What is the average commission charged on one end of a deal?</p>
                <input type="number" placeholder="0" value={averageCommission} onChange={(e) => numberInputChange(e, setAverageCommission)} />
                <p>What percentage is yours?</p>
                <input type="number" placeholder="0" value={percentage} onChange={(e) => numberInputChange(e, setPercentage)} />
                <hr className="divider" />
                <h3>Total Value: ${totalTeamLeader.toLocaleString()}</h3>
              </div>
            )}
          </div>

          {/*Revshare Section*/}
          <div className="revshare-income">
            <div className="toggle-row">
              <h3>Will you attract agents to ROA?</h3>
              <label className="toggle">
                <input type="checkbox" checked={showRevshare} onChange={() => setShowRevshare(!showRevshare)} />
                <span className="slider-button"></span>
              </label>
            </div>
            {showRevshare && (
              <div>
                <hr className="divider" />
                <h2>Add agent count in each level (below)</h2>
                <div className="top-row">
                  {[1, 2, 3].map((lvl) => (
                    <button key={lvl} onClick={() => setActiveLevel(lvl)} className={`revButton ${activeLevel === lvl ? 'active' : ''}`}>
                      Level {lvl}
                    </button>
                  ))}
                </div>
                <div className="bottom-row">
                  {[4, 5, 6].map((lvl) => (
                    <button key={lvl} onClick={() => setActiveLevel(lvl)} className={`revButton ${activeLevel === lvl ? 'active' : ''}`}>
                      {lvl === 6 ? 'Infinity' : `Level ${lvl}`}
                    </button>
                  ))}
                </div>

                <p>{activeLevel === 1 ? "What is the expected count of Level 1 agents in your network?" : `How many agents are in Level ${activeLevel}?`}</p>
                <input
                  type="number"
                  placeholder="0"
                  value={levelInputs[activeLevel]?.count || ""}
                  onChange={(e) => handleLevelInputChange("count", e.target.value)}
                />
                <p>Expected Annual percentage of your network?</p>
                <input
                  type="number"
                  placeholder="0"
                  value={levelInputs[activeLevel]?.capPercent || ""}
                  onChange={(e) => handleLevelInputChange("capPercent", e.target.value)}
                />

                <hr className="divider" />
                <div className="levels1">
                {[1].map((level) => (
                  <h4 key={level}>
                    Level {level} Earnings: {unlockedLevels.includes(level) && revshareValues[level] !== undefined
                      ? `$${revshareValues[level].toLocaleString()}`
                      : "Locked"}
                  </h4>
                ))}

                {[2].map((level) => (
                  <h4 key={level}>
                    Level {level} Earnings: {unlockedLevels.includes(level) && revshareValues[level] !== undefined
                      ? `$${revshareValues[level].toLocaleString()}`
                      : "Locked"}
                  </h4>
                ))}

                {[3].map((level) => (
                  <h4 key={level}>
                    Level {level} Earnings: {unlockedLevels.includes(level) && revshareValues[level] !== undefined
                      ? `$${revshareValues[level].toLocaleString()}`
                      : "Locked"}
                  </h4>
                ))}
                </div>
                <div className="levels2">
                {[4, 5, 6].map((level) => (
                  <h4 key={level}>
                    Level {level} Earnings: {unlockedLevels.includes(level) && revshareValues[level] !== undefined
                      ? `$${revshareValues[level].toLocaleString()}`
                      : "Locked"}
                  </h4>
                ))}
                </div>
                <hr className="divider" />
                <h3>Total value: ${totalRevshare.toLocaleString()}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Calculator;
