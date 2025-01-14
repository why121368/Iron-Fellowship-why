import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useAuth } from "providers/AuthProvider";
import { useState } from "react";
import { StoredCampaign } from "types/Campaign.type";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import { useUpdateCampaignGM } from "api/campaign/updateCampaignGM";
import { useDeleteCampaign } from "api/campaign/deleteCampaign";
import { useConfirm } from "material-ui-confirm";
import { useLeaveCampaign } from "api/campaign/leaveCampaign";
import { useNavigate } from "react-router-dom";
import { CAMPAIGN_ROUTES, constructCampaignPath } from "pages/Campaign/routes";

export interface CampaignActionsMenuProps {
  campaignId: string;
  campaign: StoredCampaign;
}

export function CampaignActionsMenu(props: CampaignActionsMenuProps) {
  const { campaignId, campaign } = props;
  const { gmId } = campaign;
  const uid = useAuth().user?.uid;
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [menuParent, setMenuParent] = useState<HTMLElement>();

  const handleMenuClose = () => {
    setMenuParent(undefined);
  };

  const { updateCampaignGM } = useUpdateCampaignGM();
  const removeCurrentGM = () => {
    updateCampaignGM({ campaignId: campaignId, gmId: undefined })
      .then(() => {
        handleMenuClose();
      })
      .catch(() => {});
  };

  const { deleteCampaign } = useDeleteCampaign();
  const handleDeleteCampaign = () => {
    confirm({
      title: "End Campaign",
      description:
        "Are you sure you want to end your campaign? This will also remove your current characters from the campaign",
      confirmationText: "End",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    }).then(() => {
      deleteCampaign({ campaignId, characters: campaign.characters })
        .then(() => {
          handleMenuClose();
        })
        .catch(() => {});
    });
  };

  const { leaveCampaign } = useLeaveCampaign();
  const handleLeaveCampaign = () => {
    confirm({
      title: "Leave Campaign",
      description: "Are you sure you want to leave this campaign?",
      confirmationText: "Leave",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    })
      .then(() => {
        leaveCampaign({ campaign, campaignId, uid })
          .then(() => {
            handleMenuClose();
            navigate(constructCampaignPath(CAMPAIGN_ROUTES.SELECT));
          })
          .catch(() => {});
      })
      .catch(() => {});
  };

  const isGm = uid && uid === gmId;

  return (
    <>
      <Button
        color={"inherit"}
        endIcon={<MoreIcon />}
        onClick={(evt) => setMenuParent(evt.currentTarget)}
      >
        More
      </Button>
      <Menu anchorEl={menuParent} open={!!menuParent} onClose={handleMenuClose}>
        {isGm && (
          <MenuItem onClick={() => removeCurrentGM()}>Step Down as GM</MenuItem>
        )}
        <MenuItem onClick={() => handleLeaveCampaign()}>
          Leave Campaign
        </MenuItem>
        {isGm && (
          <MenuItem onClick={() => handleDeleteCampaign()}>
            End Campaign
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
