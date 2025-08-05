import { useState, useEffect } from 'react';

const REVSHARE_PER_AGENT = {
  1: 3500,
  2: 2100,
  3: 1400,
  4: 700,
  5: 700,
  6: 70,
};

export function useRevShareCalc() {
  const [level1Agents, setLevel1Agents] = useState(0);
  const [activeLevel, setActiveLevel] = useState(1);
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [levelInputs, setLevelInputs] = useState({});
  const [revshareValues, setRevshareValues] = useState({});
  const [totalRevshare, setTotalRevshare] = useState(0);

  // Update unlockedLevels (used for showing inputs + UI)
  useEffect(() => {
    const newUnlocked = [1];
    if (level1Agents >= 1) newUnlocked.push(2);
    if (level1Agents >= 3) newUnlocked.push(3);
    if (level1Agents >= 6) newUnlocked.push(4);
    if (level1Agents >= 9) newUnlocked.push(5);
    if (level1Agents >= 23) newUnlocked.push(6);
    setUnlockedLevels(newUnlocked);
  }, [level1Agents]);

  // Calculate earnings per level with full + partial logic
  useEffect(() => {
    const newRevshareValues = {};
    let total = 0;

    for (let level = 1; level <= 6; level++) {
      const inputs = levelInputs[level];
      if (!inputs) {
        newRevshareValues[level] = 0;
        continue;
      }

      const { count = 0, capPercent = 0 } = inputs;
      const revPerAgent = REVSHARE_PER_AGENT[level];
      const percent = capPercent / 100;
      let earnings = 0;

      // Apply your unlocking logic
      if (level === 1) {
        earnings = count * percent * revPerAgent;
      } else if (level === 2) {
        if (level1Agents >= 3) {
          earnings = count * percent * revPerAgent; // full
        } else if (level1Agents >= 1) {
          earnings = count * percent * (1400); // partial
        }
      } else if (level === 3) {
        if (level1Agents >= 6) {
          earnings = count * percent * revPerAgent;
        } else if (level1Agents >= 3) {
          earnings = count * percent * (700);
        }
      } else if (level === 4) {
        if (level1Agents >= 9) {
          earnings = count * percent * revPerAgent;
        } else if (level1Agents >= 6) {
          earnings = count * percent * (350);
        }
      } else if (level === 5) {
        if (level1Agents >= 23) {
          earnings = count * percent * revPerAgent;
        } else if (level1Agents >= 9) {
          earnings = count * percent * (350);
        }
      } else if (level === 6) {
        if (level1Agents >= 23) {
          earnings = count * percent * revPerAgent;
        } else {
          earnings = 0;
        }
      }

      newRevshareValues[level] = earnings;
      total += earnings;
    }

    setRevshareValues(newRevshareValues);
    setTotalRevshare(total);
  }, [levelInputs, level1Agents]);

  const handleLevelInputChange = (field, value) => {
    const numValue = value === "" ? "" : Number(value);

    setLevelInputs((prev) => ({
      ...prev,
      [activeLevel]: {
        ...prev[activeLevel],
        [field]: numValue,
      },
    }));

    if (activeLevel === 1 && field === "count") {
      setLevel1Agents(numValue);
    }
  };

  return {
    level1Agents,
    setLevel1Agents,
    activeLevel,
    setActiveLevel,
    levelInputs,
    setLevelInputs,
    revshareValues,
    totalRevshare,
    unlockedLevels,
    handleLevelInputChange,
  };
}
