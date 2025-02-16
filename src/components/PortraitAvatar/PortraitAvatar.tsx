import { Translate } from "@mui/icons-material";
import { Box, Typography, TypographyVariant, Skeleton } from "@mui/material";
import { useListenToCharacterPortraitUrl } from "api/characters/getCharacterPortraitUrl";
import { getHueFromString } from "functions/getHueFromString";
import { useState } from "react";
import { useMiscDataStore } from "stores/miscData.store";

type AvatarSizes = "small" | "medium" | "large" | "huge";

const sizes: { [key in AvatarSizes]: number } = {
  small: 40,
  medium: 60,
  large: 80,
  huge: 200,
};

const variants: { [key in AvatarSizes]: TypographyVariant } = {
  small: "h6",
  medium: "h5",
  large: "h4",
  huge: "h1",
};

export interface PortraitAvatarProps {
  uid: string;
  characterId: string;
  name?: string;
  portraitSettings?: {
    filename: string;
    position: {
      x: number;
      y: number;
    };
    scale: number;
  };
  size?: AvatarSizes;
  colorful?: boolean;
  rounded?: boolean;
  darkBorder?: boolean;
}

export function PortraitAvatar(props: PortraitAvatarProps) {
  const {
    uid,
    characterId,
    name,
    portraitSettings,
    colorful,
    size = "medium",
    darkBorder,
    rounded,
  } = props;

  useListenToCharacterPortraitUrl(uid, characterId, portraitSettings?.filename);
  const portraitUrl: string | undefined = useMiscDataStore(
    (store) => store.portraitUrls[characterId]
  );

  const [isTaller, setIsTaller] = useState<boolean>(true);

  let marginLeft = 0;
  let marginTop = 0;
  if (portraitSettings) {
    marginLeft = portraitSettings.position.x * -100;
    marginTop = portraitSettings.position.y * -100;
  }

  const scale = portraitSettings?.scale ?? 1;

  const shouldShowColor = colorful && !portraitUrl;
  const hue = getHueFromString(characterId);

  const borderWidth = size === "huge" ? 12 : 2;

  return (
    <Box
      width={sizes[size]}
      height={sizes[size]}
      overflow={"hidden"}
      sx={(theme) => ({
        backgroundColor: shouldShowColor
          ? `hsl(${hue}, 60%, 85%)`
          : theme.palette.grey[200],
        color: shouldShowColor
          ? `hsl(${hue}, 80%, 20%)`
          : theme.palette.grey[700],
        display: portraitUrl ? "block" : "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth,
        borderStyle: "solid",
        borderColor: shouldShowColor
          ? `hsl(${hue}, 60%, 40%)`
          : darkBorder
          ? theme.palette.grey[700]
          : theme.palette.grey[400],
        borderRadius: rounded ? "100%" : theme.shape.borderRadius,
        "&>img": {
          width: isTaller ? `${100 * scale}%` : "auto",
          height: isTaller ? "auto" : `${100 * scale}%`,
          position: "relative",
          transform: `translate(calc(${marginLeft}% + ${
            sizes[size] / 2
          }px - ${borderWidth}px), calc(${marginTop}% + ${
            sizes[size] / 2
          }px - ${borderWidth}px))`,
        },
        zIndex: 2,
        flexShrink: 0,
      })}
    >
      {portraitUrl ? (
        <img
          src={portraitUrl}
          alt={name}
          onLoad={(evt) => {
            if (evt.currentTarget.width > evt.currentTarget.height) {
              setIsTaller(false);
            } else {
              setIsTaller(true);
            }
          }}
        />
      ) : name ? (
        <Typography variant={variants[size]}>{name[0]}</Typography>
      ) : (
        <Skeleton
          variant={"rectangular"}
          sx={{ flexGrow: 1, height: "100%" }}
        />
      )}
    </Box>
  );
}
