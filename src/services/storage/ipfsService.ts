import { create, IPFSHTTPClient } from 'ipfs-http-client';

// IPFS client instance
let ipfsClient: IPFSHTTPClient | null = null;

/**
 * Initialize the IPFS client with Infura credentials
 */
export const initIPFSClient = () => {
  // Use environment variables for authentication
  const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
  const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET;
  
  if (!projectId || !projectSecret) {
    console.error('Missing Infura credentials. Please set NEXT_PUBLIC_INFURA_PROJECT_ID and NEXT_PUBLIC_INFURA_PROJECT_SECRET environment variables.');
    return null;
  }
  
  // Create authorization header
  const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;
  
  // Create IPFS client
  ipfsClient = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });
  
  return ipfsClient;
};

/**
 * Upload a file to IPFS
 * @param file The file to upload
 * @returns IPFS CID
 */
export const uploadToIPFS = async (file: File): Promise<string> => {
  if (!ipfsClient) {
    initIPFSClient();
    if (!ipfsClient) {
      throw new Error('Failed to initialize IPFS client');
    }
  }
  
  try {
    const fileBuffer = await file.arrayBuffer();
    const result = await ipfsClient.add(new Uint8Array(fileBuffer));
    return result.path;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

/**
 * Upload JSON metadata to IPFS
 * @param metadata The metadata object to upload
 * @returns IPFS CID
 */
export const uploadJSONToIPFS = async (metadata: Record<string, any>): Promise<string> => {
  if (!ipfsClient) {
    initIPFSClient();
    if (!ipfsClient) {
      throw new Error('Failed to initialize IPFS client');
    }
  }
  
  try {
    const result = await ipfsClient.add(JSON.stringify(metadata));
    return result.path;
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    throw error;
  }
};

/**
 * Get an HTTP URL for an IPFS resource
 * @param ipfsCid The IPFS CID
 * @returns HTTP URL for the IPFS resource
 */
export const getIPFSHttpUrl = (ipfsCid: string): string => {
  // Use the IPFS gateway URL format
  return `https://ipfs.io/ipfs/${ipfsCid}`;
};

/**
 * Upload audio to IPFS with metadata
 * @param audioBlob The audio data as a Blob
 * @param metadata Metadata for the audio
 * @returns Object containing IPFS CIDs for both audio and metadata
 */
export const uploadAudioToIPFS = async (
  audioBlob: Blob,
  metadata: Record<string, any>
): Promise<{ audioCid: string; metadataCid: string }> => {
  // Create a file from the blob
  const audioFile = new File([audioBlob], 'audio.wav', { type: 'audio/wav' });
  
  // Upload the audio file
  const audioCid = await uploadToIPFS(audioFile);
  
  // Add the IPFS URL to the metadata
  const metadataWithAudio = {
    ...metadata,
    audio: getIPFSHttpUrl(audioCid),
    audioCid,
  };
  
  // Upload the metadata
  const metadataCid = await uploadJSONToIPFS(metadataWithAudio);
  
  return { audioCid, metadataCid };
};

export default {
  uploadToIPFS,
  uploadJSONToIPFS,
  getIPFSHttpUrl,
  uploadAudioToIPFS,
  initIPFSClient,
}; 