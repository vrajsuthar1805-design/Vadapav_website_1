import { db, isFirebaseConfigured } from "./firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { SiteData } from "./types";
import { defaultSiteData } from "./defaultData";

const STORAGE_KEY = "mumbai_spice_navratri_site_data";
const COLLECTION_NAME = "stallConfig";
const DOC_ID = "main";

export const getLocalCachedData = (): SiteData => {
  if (typeof window === "undefined") {
    return defaultSiteData;
  }
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      // Ensure merged with defaults in case of missing keys
      return {
        ...defaultSiteData,
        ...parsed,
        stall: { ...defaultSiteData.stall, ...(parsed.stall || {}) },
        stampCard: { ...defaultSiteData.stampCard, ...(parsed.stampCard || {}) },
        menuNotes: { ...defaultSiteData.menuNotes, ...(parsed.menuNotes || {}) },
        sections: { ...defaultSiteData.sections, ...(parsed.sections || {}) },
      };
    }
  } catch (err) {
    console.error("Error reading cached data:", err);
  }
  return defaultSiteData;
};

export const saveLocalCachedData = (data: SiteData): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("mumbai_spice_data_updated", { detail: data }));
  } catch (err) {
    console.error("Error saving local cache:", err);
  }
};

export const fetchSiteData = async (): Promise<SiteData> => {
  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, COLLECTION_NAME, DOC_ID);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const firestoreData = snapshot.data() as SiteData;
        saveLocalCachedData(firestoreData);
        return firestoreData;
      }
    } catch (error) {
      console.warn("Firestore fetch error, falling back to cached/default data:", error);
    }
  }
  return getLocalCachedData();
};

export const saveSiteData = async (data: SiteData): Promise<{ success: boolean; firestoreSaved: boolean; error?: string }> => {
  const dataToSave: SiteData = {
    ...data,
    lastUpdated: new Date().toISOString()
  };

  // Always save locally first for instant snappy response
  saveLocalCachedData(dataToSave);

  let firestoreSaved = false;
  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, COLLECTION_NAME, DOC_ID);
      await setDoc(docRef, dataToSave);
      firestoreSaved = true;
    } catch (error: any) {
      console.error("Error saving to Firestore:", error);
      return {
        success: false,
        firestoreSaved: false,
        error: error?.message || "Failed to save to Firestore. Check permissions/network."
      };
    }
  }

  return { success: true, firestoreSaved };
};

export const subscribeToSiteData = (onData: (data: SiteData) => void): (() => void) => {
  // Initial local delivery
  onData(getLocalCachedData());

  let unsubscribeFirestore: (() => void) | null = null;

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, COLLECTION_NAME, DOC_ID);
      unsubscribeFirestore = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const firestoreData = snapshot.data() as SiteData;
            saveLocalCachedData(firestoreData);
            onData(firestoreData);
          }
        },
        (error) => {
          console.warn("Firestore snapshot listener error:", error);
        }
      );
    } catch (err) {
      console.warn("Could not attach Firestore listener:", err);
    }
  }

  // Multi-tab / local event listener
  const handleLocalUpdate = (event: Event) => {
    const customEvent = event as CustomEvent<SiteData>;
    if (customEvent.detail) {
      onData(customEvent.detail);
    }
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        onData(JSON.parse(event.newValue));
      } catch (e) {
        // ignore
      }
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("mumbai_spice_data_updated", handleLocalUpdate);
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    if (unsubscribeFirestore) unsubscribeFirestore();
    if (typeof window !== "undefined") {
      window.removeEventListener("mumbai_spice_data_updated", handleLocalUpdate);
      window.removeEventListener("storage", handleStorage);
    }
  };
};

export const seedDefaultData = async (): Promise<{ success: boolean; firestoreSaved: boolean; error?: string }> => {
  return await saveSiteData(defaultSiteData);
};
