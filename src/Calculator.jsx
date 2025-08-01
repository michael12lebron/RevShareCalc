import { useState } from 'react';
import { useCommissionCalculator } from './commission';
import{useTeamLeaderCalc} from './teamleader';

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

  const{
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
  const averageVolume2 = Math.max(0,averageVolume)

  return (
    <>
      <div className="top-of-page">
        <h1 className="title">My Wealth Calculator</h1>
        <p className="little-description">Welcome to my version of Realty of America's Wealth Calculator!</p>
        <img src="/images/roa-logo2-blue.png" alt="Realty of America" className="roa-logo"></img>

        <div className="first-section">
          <div className="left-column">
            {/* Graph circle thing */}
            <div className="circle-graph">
              <h2>Earnings Graph</h2>
            </div>

            {/* Earnings Overview */}
            <div className="earnings-overview">
              <h2> Earnings Overview</h2>
              <p>Comission Income:</p>
              <p>Team Leader Income:${totalTeamLeader.toLocaleString()}</p>
              <p>Revenue Share Income: ${totalValueCommission2.toLocaleString()}</p>
            </div>
          </div>

          {/* Commission Income */}
          <div className="commission-income">
            <h2>Commission Income</h2>
            <hr className="divider"></hr>
            <p> Are you a Half Capper of Full Capper?</p>
            <select 
              value= {capperType? "half-capper": "full-capper"}
              onChange={(e) => setCapperType(e.target.value==="half-capper")}
            >
              <option value="half-capper">Half Capper</option>
              <option value="full-capper">Full Capper</option>
            </select>
            <h3>Individual</h3>
            <p>What is your average home sales price?</p>
            <input type="range" min="0" max="5000000" value={averageHomePrice} onChange={(e) => setAverageHomePrice(Number(e.target.value))}></input>
            <div className="dollar-sign">
              <span className="dollar">$</span>
              <input 
              type="number" 
              placeholder="0"
              value={averageHomePrice}
              onChange={(e) => setAverageHomePrice(Number(e.target.value))}
              ></input>
            </div>
            <p>How many transactions per years?</p>
            <input type="range" min="0" max="150" value={averageTransactions} onChange={(e) => setAverageTransactions(Number(e.target.value))}></input>
              <div className="transactions">
              <span className="transactions-sign">↹</span>
              <input type="text" placeholder="0" value={averageTransactions} onChange={(e) => setAverageTransactions(Number(e.target.value))}></input>
            </div>
            <h4>Volume per year: ${averageVolume2.toLocaleString()}</h4> 
            <p>What is the average commission charged on one end of a deal?</p>
            <div className="percentage">
              <span className="percentage-sign">%</span>
              <input type="number" placeholder="0" value={commissionPercent} onChange={(e) => setCommissionPercent(Number(e.target.value))}></input>
            </div>
            <hr className="divider"></hr>
            <h4>Total Value:</h4>
            <p>${totalValueCommission2.toLocaleString()}</p>
          </div>
        </div>



        <div className="second-section">
          {/* Team Leader Section */}
          <div className="team-leader-section">
            <div className="toggle-row">
              <h3>Will you be a team leader?</h3>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showTeamLeader}
                  onChange={() => setShowTeamLeader(!showTeamLeader)}
                />
                <span className="slider-button"></span>
              </label>
            </div>

            {showTeamLeader && (
              <div>
                <hr className="divider"></hr>
                <p>How many team members will you have?</p>
                <input type="number" placeholder="0" value={teamMembers} onChange={(e)=>setTeamMembers(Number(e.target.value))}></input>
                <p>How many transactions will each team member close per year?</p>
                <input type="number" placeholder="0" value={transactionsMember} onChange={(e)=>setTransactionsMember(Number(e.target.value))}></input>
                <p>What percentage of these team members are half cappers?</p>
                <input type="number" placeholder="0" value={percentageCappers} onChange={(e)=>setPercentageCappers(Number(e.target.value))}></input>
                <p>What is the average home sales price?</p>
                <input type="numbers" placeholder="0" value={averageHomeSale} onChange={(e)=>setAverageHomeSale(Number(e.target.value))}></input>
                <p>What is the average commission charged on one end of a deal?</p>
                <input type="numbers" placeholder="0" value={averageCommission} onChange={(e)=>setAverageCommission(Number(e.target.value))}></input>
                <p>What percentage is yours?</p>
                <input type="number" placeholder="0" value={percentage} onChange={(e)=>setPercentage(Number(e.target.value))}></input>
                <hr className="divider"></hr>
                <h3>Total Value: ${totalTeamLeader.toLocaleString()}</h3>
              </div>
            )}
          </div>

          {/* Revshare Income */}
          <div className="revshare-income">
            <div className="toggle-row">
              <h3>Will you attract agents to ROA?</h3>
              <label className="toggle">
                <input 
                  type="checkbox"
                  checked={showRevshare}
                  onChange={() => setShowRevshare (!showRevshare)}
                />
                <span className="slider-button"></span>
              </label>
            </div>  

            {showRevshare &&(
              <div>
                <hr className="divider"></hr>
                <h2>Add agent count in each level (below)</h2>
                <div className="top-row">
                <button>Level 1</button>
                <button>Level 2</button>
                <button>Level 3</button>
                </div>
                <div className="bottom-row">
                <button>Level 4</button>
                <button>Level 5</button>
                <button>Infinity</button>
                </div>
                <h4>Expected Earning: $0</h4> {/*Put a value here later*/}
                <p>Expected count of Level 1 agents in your network</p>
                <input></input>
                <p>Expected Annual percentage of your network?</p>
                <input></input>
                <hr className="divider"></hr>
                <h3>Total value: $0</h3> {/*Put a value here later*/}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Calculator;
