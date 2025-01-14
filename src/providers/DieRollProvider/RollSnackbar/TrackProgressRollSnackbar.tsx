import { Box, ButtonBase, Card, Divider, Typography } from "@mui/material";
import { ROLL_RESULT, TrackProgressRoll } from "types/DieRolls.type";
import { D10Icon } from "assets/D10Icon";

const getRollResultLabel = (result: ROLL_RESULT) => {
  switch (result) {
    case ROLL_RESULT.HIT:
      return "Strong Hit";
    case ROLL_RESULT.WEAK_HIT:
      return "Weak Hit";
    case ROLL_RESULT.MISS:
      return "Miss";
  }
};

export interface TrackProgressRollSnackbarProps {
  roll: TrackProgressRoll;
  clearRoll: () => void;
  expanded: boolean;
}

export function TrackProgressRollSnackbar(
  props: TrackProgressRollSnackbarProps
) {
  const { roll, clearRoll, expanded } = props;

  return (
    <Card
      sx={(theme) => ({
        px: 2,
        py: 1,
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        mt: 1,
      })}
      component={ButtonBase}
      onClick={() => clearRoll()}
    >
      <Typography
        variant={expanded ? "h6" : "subtitle1"}
        fontFamily={(theme) => theme.fontFamilyTitle}
      >
        {roll.rollLabel}
      </Typography>
      <Box display={"flex"} flexDirection={"row"}>
        {expanded && (
          <Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography color={(theme) => theme.palette.grey[200]}>
                Progress: {roll.trackProgress}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <D10Icon />
              <Typography ml={1} color={(theme) => theme.palette.grey[200]}>
                {roll.challenge1}, {roll.challenge2}
              </Typography>
            </Box>
          </Box>
        )}
        {expanded && (
          <Divider
            orientation={"vertical"}
            sx={(theme) => ({
              alignSelf: "stretch",
              borderColor: theme.palette.grey[400],
              height: "auto",
              mx: 2,
            })}
          />
        )}
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          justifyContent={"center"}
        >
          <Typography
            color={"white"}
            variant={"h5"}
            fontFamily={(theme) => theme.fontFamilyTitle}
          >
            {getRollResultLabel(roll.result)}
          </Typography>
          {roll.challenge1 === roll.challenge2 && (
            <Typography
              color={(theme) => theme.palette.grey[200]}
              variant={"caption"}
              fontFamily={(theme) => theme.fontFamilyTitle}
            >
              Doubles
            </Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
}
