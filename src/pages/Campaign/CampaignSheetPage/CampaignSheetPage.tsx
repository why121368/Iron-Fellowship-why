import { Box, LinearProgress, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSnackbar } from "hooks/useSnackbar";
import { useCampaignStore } from "stores/campaigns.store";
import { CampaignSheetHeader } from "./components/CampaignSheetHeader";
import { CharacterSection } from "./components/CharacterSection";
import { WorldSection } from "./components/WorldSection";

import { CAMPAIGN_ROUTES, constructCampaignPath } from "../routes";
import { PageContent } from "components/Layout";
import { BreakContainer } from "components/BreakContainer";
import { TracksSection } from "./components/TracksSection";
import { EmptyState } from "components/EmptyState/EmptyState";
import { StyledTabs, StyledTab } from "components/StyledTabs";

enum TABS {
  CHARACTER = "characters",
  WORLD = "world",
  TRACKS = "tracks",
}

export function CampaignSheetPage() {
  const { campaignId } = useParams();

  const { error } = useSnackbar();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<TABS>(
    (searchParams.get("tab") as TABS) ?? TABS.CHARACTER
  );
  const handleTabChange = (tab: TABS) => {
    setSelectedTab(tab);
    setSearchParams({ tab });
  };

  const campaigns = useCampaignStore((store) => store.campaigns);
  const loading = useCampaignStore((store) => store.loading);

  useEffect(() => {
    if (!loading && (!campaignId || !campaigns[campaignId])) {
      error("You aren't a member of this campaign");
      navigate(constructCampaignPath(CAMPAIGN_ROUTES.SELECT));
    }
  }, [loading, campaigns, campaignId]);

  if (loading) {
    return (
      <LinearProgress
        sx={{ width: "100vw", position: "absolute", left: 0, marginTop: -3 }}
      />
    );
  }

  if (!campaignId || !campaigns[campaignId]) {
    return null;
  }

  const campaign = campaigns[campaignId];

  return (
    <>
      <CampaignSheetHeader campaign={campaign} campaignId={campaignId} />
      <PageContent isPaper>
        <BreakContainer>
          <StyledTabs
            value={selectedTab}
            onChange={(evt, value) => handleTabChange(value)}
            indicatorColor="secondary"
            centered
            variant={"standard"}
          >
            <StyledTab value={TABS.CHARACTER} label={"Characters"} />
            <StyledTab value={TABS.WORLD} label={"World"} />
            <StyledTab value={TABS.TRACKS} label={"Tracks"} />
          </StyledTabs>
        </BreakContainer>
        {selectedTab === TABS.CHARACTER && (
          <CharacterSection campaign={campaign} campaignId={campaignId} />
        )}
        {selectedTab === TABS.WORLD && (
          <>
            {campaign.worldId && campaign.gmId ? (
              <WorldSection
                worldId={campaign.worldId}
                worldOwnerId={campaign.gmId}
              />
            ) : (
              <EmptyState
                title="No World Found"
                message={
                  "Your GM can add a world to this campaign from the GM screen. Adding a world will allow for locations to be used."
                }
                imageSrc={"/assets/nature.svg"}
              />
            )}
          </>
        )}
        {selectedTab === TABS.TRACKS && (
          <TracksSection
            campaignId={campaignId}
            campaign={campaign}
            addTopMargin={false}
          />
        )}
      </PageContent>
    </>
  );
}
