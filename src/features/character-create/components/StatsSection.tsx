import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { STATS } from "../../../types/stats.enum";
import { useCharacterCreateStore } from "../store/characterCreate.store";
import { StatDropdown } from "./StatDropdown";

export function StatsSection() {
  const stats = useCharacterCreateStore((store) => store.stats);
  const setStat = useCharacterCreateStore((store) => store.setStat);

  const [statsRemainingTracker, setStatsRemainingTracker] = useState<number[]>([
    3, 2, 2, 1, 1,
  ]);

  const updateStat = (stat: STATS, value: number | undefined) => {
    setStatsRemainingTracker((prevRemaining) => {
      let remaining = [...prevRemaining];

      // if we are setting a value in, we need to remove it from the remaining array
      if (value) {
        const remainingIdx = remaining.indexOf(value ?? -1);

        if (remainingIdx >= 0) {
          remaining.splice(remainingIdx, 1);
        }
      }

      const currentStat = stats[stat];
      if (currentStat) {
        remaining.push(currentStat);
      }

      setStat(stat, value);

      return remaining;
    });
  };

  return (
    <Box>
      <Typography variant={"h6"}>Stats</Typography>
      <Typography color={"GrayText"}>
        Select a number 1-3 for each stat.
      </Typography>
      <Box mt={2}>
        <StatDropdown
          label={"Edge"}
          value={stats[STATS.EDGE]}
          onChange={(value) => updateStat(STATS.EDGE, value)}
          remainingOptions={statsRemainingTracker}
        />
        <StatDropdown
          label={"Heart"}
          value={stats[STATS.HEART]}
          onChange={(value) => updateStat(STATS.HEART, value)}
          remainingOptions={statsRemainingTracker}
        />
        <StatDropdown
          label={"Iron"}
          value={stats[STATS.IRON]}
          onChange={(value) => updateStat(STATS.IRON, value)}
          remainingOptions={statsRemainingTracker}
        />
        <StatDropdown
          label={"Shadow"}
          value={stats[STATS.SHADOW]}
          onChange={(value) => updateStat(STATS.SHADOW, value)}
          remainingOptions={statsRemainingTracker}
        />
        <StatDropdown
          label={"Wits"}
          value={stats[STATS.WITS]}
          onChange={(value) => updateStat(STATS.WITS, value)}
          remainingOptions={statsRemainingTracker}
        />
      </Box>
    </Box>
  );
}
