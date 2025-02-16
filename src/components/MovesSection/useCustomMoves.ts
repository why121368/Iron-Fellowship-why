import { Move, MoveCategory } from "dataforged";
import { useCampaignGMScreenStore } from "pages/Campaign/CampaignGMScreenPage/campaignGMScreen.store";
import { useCharacterSheetStore } from "pages/Character/CharacterSheetPage/characterSheet.store";
import { generateCustomDataswornId } from "functions/dataswornIdEncoder";
import { useEffect, useState } from "react";
import { License, RollMethod, RollType } from "types/Datasworn";
import { customMoveCategoryPrefix, StoredMove } from "types/Moves.type";

function convertStoredMoveToMove(storedMove: StoredMove): Move {
  return {
    $id: storedMove.$id,
    Title: {
      $id: `${storedMove.$id}/title`,
      Canonical: storedMove.name,
      Standard: storedMove.name,
      Short: storedMove.name,
    },
    Category: "ironsworn/moves/custom",
    Display: {},
    Source: {
      Title: "Custom Move",
      Authors: ["Campaign GM"],
      License: License.None,
    },
    Oracles: storedMove.oracleIds,
    Optional: false,
    Trigger: {
      $id: `${storedMove.$id}/outcomes`,
      Options: [
        {
          $id: `${storedMove.$id}/trigger/options/1`,
          Method: RollMethod.Any,
          "Roll type": RollType.Action,
          Using: storedMove.stats ?? [],
        },
      ],
    },
    Text: storedMove.text,
  };
}

export function useCustomMoves() {
  const campaignCustomMoves = useCampaignGMScreenStore(
    (store) => store.customMoves
  );
  const hiddenCampaignMoveIds = useCampaignGMScreenStore(
    (store) => store.campaignSettings?.hiddenCustomMoveIds
  );

  const characterSheetCustomMoves = useCharacterSheetStore(
    (store) => store.customMoves
  );
  const hiddenCharacterMoveIds = useCharacterSheetStore(
    (store) => store.characterSettings?.hiddenCustomMoveIds
  );

  const [customMoveCategory, setCustomMoveCategory] = useState<MoveCategory>();

  useEffect(() => {
    const customStoredMoves = campaignCustomMoves ?? characterSheetCustomMoves;
    const hiddenMoveIds = hiddenCampaignMoveIds ?? hiddenCharacterMoveIds;

    if (
      customStoredMoves &&
      customStoredMoves.length > 0 &&
      Array.isArray(hiddenMoveIds)
    ) {
      const mappedCustomMoves: { [key: string]: Move } = {};

      customStoredMoves.forEach((storedMove) => {
        if (!hiddenMoveIds.includes(storedMove.$id)) {
          mappedCustomMoves[storedMove.$id] =
            convertStoredMoveToMove(storedMove);
        }
      });

      setCustomMoveCategory({
        $id: customMoveCategoryPrefix,
        Title: {
          $id: `${customMoveCategoryPrefix}/title`,
          Canonical: "Custom Moves",
          Short: "Custom Moves",
          Standard: "Custom Moves",
        },
        Moves: mappedCustomMoves,
        Source: {
          Title: "Custom Move",
          Authors: [],
          License: License.None,
        },
        Description: "Moves created by you or your Campaign GM",
        Display: {},
        Optional: true,
      });
    } else {
      setCustomMoveCategory(undefined);
    }
  }, [
    campaignCustomMoves,
    characterSheetCustomMoves,
    hiddenCampaignMoveIds,
    hiddenCharacterMoveIds,
  ]);

  return customMoveCategory;
}
