import { constructLocationImagePath } from "api/worlds/locations/_getRef";
import produce from "immer";
import { getImageUrl } from "lib/storage.lib";
import { GMLocationDocument, LocationDocument } from "types/Locations.type";
import { GMNPCDocument, NPCDocument } from "types/NPCs.type";
import { StoreApi } from "zustand";

export type LocationDocumentWithGMProperties = LocationDocument & {
  gmProperties?: GMLocationDocument;
  notes?: Uint8Array | null;
  imageUrls?: string[];
};

export type NPC = NPCDocument & {
  gmProperties?: GMNPCDocument;
  notes?: Uint8Array | null;
  imageUrls?: string[];
};

export interface LocationStoreProperties {
  locations: {
    [key: string]: LocationDocumentWithGMProperties;
  };
  updateLocation: (
    locationId: string,
    location: LocationDocument,
    loadLocationImage: (filename: string) => void
  ) => void;
  updateLocationGMProperties: (
    locationId: string,
    locationGMProperties: GMLocationDocument
  ) => void;
  updateLocationNotes: (locationId: string, notes: Uint8Array | null) => void;
  addLocationImageURL: (
    locationId: string,
    imageIndex: number,
    url: string
  ) => void;
  removeLocation: (locationId: string) => void;
  clearLocations: () => void;

  openLocationId?: string;
  setOpenLocationId: (locationId?: string) => void;

  npcs: {
    [key: string]: NPC;
  };
  updateNPC: (
    npcId: string,
    npc: NPCDocument,
    loadNPCImage: (filename: string) => void
  ) => void;
  updateNPCGMProperties: (
    npcId: string,
    npcGMProperties: GMNPCDocument
  ) => void;
  updateNPCNotes: (npcId: string, notes: Uint8Array | null) => void;
  addNPCImageURL: (npcId: string, imageIndex: number, url: string) => void;
  removeNPC: (npcId: string) => void;
  clearNPCs: () => void;

  openNPCId?: string;
  setOpenNPCId: (npcId?: string) => void;
}

export const initialLocationState = {
  locations: {},
  openLocationId: undefined,

  npcs: {},
  openNPCId: undefined,
};

export const locationStore = (
  set: StoreApi<LocationStoreProperties>["setState"]
) => ({
  updateLocation: (
    locationId: string,
    location: LocationDocument,
    loadLocationImage: (filename: string) => void
  ) => {
    set(
      produce((state: LocationStoreProperties) => {
        const { gmProperties, notes, imageUrls } =
          state.locations[locationId] ?? {};
        state.locations[locationId] = {
          gmProperties,
          notes,
          imageUrls,
          ...location,
        };

        const previousImageFilename =
          state.locations[locationId]?.imageUrls?.[0];
        const newImageFilename = location.imageFilenames?.[0];

        if (previousImageFilename !== newImageFilename && newImageFilename) {
          loadLocationImage(newImageFilename);
        }
      })
    );
  },

  updateLocationGMProperties: (
    locationId: string,
    locationGMProperties: GMLocationDocument
  ) => {
    set(
      produce((state: LocationStoreProperties) => {
        state.locations[locationId].gmProperties = locationGMProperties;
      })
    );
  },

  updateLocationNotes: (locationId: string, notes: Uint8Array | null) => {
    set(
      produce((state: LocationStoreProperties) => {
        state.locations[locationId].notes = notes;
      })
    );
  },

  addLocationImageURL: (
    locationId: string,
    imageIndex: number,
    url: string
  ) => {
    set(
      produce((state: LocationStoreProperties) => {
        if (!Array.isArray(state.locations[locationId].imageUrls)) {
          state.locations[locationId].imageUrls = [];
        }
        (state.locations[locationId].imageUrls as string[])[imageIndex] = url;
      })
    );
  },

  removeLocation: (locationId: string) => {
    set(
      produce((state: LocationStoreProperties) => {
        delete state.locations[locationId];
      })
    );
  },

  clearLocations: () => {
    set(
      produce((state: LocationStoreProperties) => {
        state.locations = {};
      })
    );
  },

  setOpenLocationId: (locationId?: string) => {
    set(
      produce((state: LocationStoreProperties) => {
        state.openLocationId = locationId;
      })
    );
  },

  updateNPC: (
    npcId: string,
    npc: NPCDocument,
    loadNPCImage: (filename: string) => void
  ) => {
    set(
      produce((state: LocationStoreProperties) => {
        const { gmProperties, notes, imageUrls } = state.npcs[npcId] ?? {};
        state.npcs[npcId] = { gmProperties, notes, imageUrls, ...npc };

        const previousImageFilename = state.npcs[npcId]?.imageUrls?.[0];
        const newImageFilename = npc.imageFilenames?.[0];

        if (previousImageFilename !== newImageFilename && newImageFilename) {
          loadNPCImage(newImageFilename);
        }
      })
    );
  },

  updateNPCGMProperties: (npcId: string, npcGMProperties: GMNPCDocument) => {
    set(
      produce((state: LocationStoreProperties) => {
        state.npcs[npcId].gmProperties = npcGMProperties;
      })
    );
  },

  updateNPCNotes: (npcId: string, notes: Uint8Array | null) => {
    set(
      produce((state: LocationStoreProperties) => {
        state.npcs[npcId].notes = notes;
      })
    );
  },

  addNPCImageURL: (npcId: string, imageIndex: number, url: string) => {
    set(
      produce((state: LocationStoreProperties) => {
        if (!Array.isArray(state.npcs[npcId].imageUrls)) {
          state.npcs[npcId].imageUrls = [];
        }
        (state.npcs[npcId].imageUrls as string[])[imageIndex] = url;
      })
    );
  },

  removeNPC: (npcId: string) => {
    set(
      produce((state: LocationStoreProperties) => {
        delete state.npcs[npcId];
      })
    );
  },

  clearNPCs: () => {
    set(
      produce((state: LocationStoreProperties) => {
        state.npcs = {};
      })
    );
  },

  setOpenNPCId: (npcId?: string) => {
    set(
      produce((state: LocationStoreProperties) => {
        state.openNPCId = npcId;
      })
    );
  },
});
