import { type AxiosRequestConfig } from "axios";

export const buildAxiosConfig = (token: string): AxiosRequestConfig => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

/**
 * Returns a PresentationTemplate by type
 *
 * - Get a list of PresentationTemplates
 * - Find & return PresentationTemplate by type
 * - Create a generic PresentationTemplate of type specified if none were found
 * @arg PresentationTemplateType
 * @returns PresentationTemplate
 */
export const getPresentationTemplate = () => {
  return;
};

/**
 * Returns a DID document of did:key of keyType Ed25519 or did:web if custom domain is verified
 * @arg MattrConfig
 * @returns DidDocument
 */
export const getIssuerDid = () => {
  return;
};

/**
 * Returns any DID
 * @returns DidDocument
 */
export const getVerifierDid = () => {
  return;
};