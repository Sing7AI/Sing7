import { initIPFSClient, uploadToIPFS, uploadJSONToIPFS, getIPFSHttpUrl } from '../../../services/storage/ipfsService';

// Mock the ipfs-http-client module
jest.mock('ipfs-http-client', () => {
  return {
    create: jest.fn().mockReturnValue({
      add: jest.fn().mockImplementation(async (data) => {
        // Mock the result of the add function
        return {
          path: 'QmTestCID',
          size: 1234,
          cid: { toString: () => 'QmTestCID' },
        };
      }),
    }),
  };
});

describe('IPFS Service', () => {
  // Original environment variables
  const originalEnv = process.env;

  beforeEach(() => {
    // Set up test environment variables
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_INFURA_PROJECT_ID: 'test-project-id',
      NEXT_PUBLIC_INFURA_PROJECT_SECRET: 'test-project-secret',
      NEXT_PUBLIC_INFURA_IPFS_ENDPOINT: 'https://ipfs.infura.io:5001',
    };
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore original environment variables
    process.env = originalEnv;
  });

  it('should initialize IPFS client with correct configuration', () => {
    const client = initIPFSClient();
    
    // Should have correct URL with auth
    expect(require('ipfs-http-client').create).toHaveBeenCalledWith({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: expect.stringContaining('Basic '),
      },
    });
    
    expect(client).toBeDefined();
  });

  it('should upload file to IPFS', async () => {
    const testFile = new Blob(['test content'], { type: 'text/plain' });
    
    const result = await uploadToIPFS(testFile);
    
    expect(result).toEqual({
      success: true,
      cid: 'QmTestCID',
      url: 'ipfs://QmTestCID',
    });
  });

  it('should handle errors during file upload', async () => {
    // Mock a failure scenario
    require('ipfs-http-client').create.mockReturnValueOnce({
      add: jest.fn().mockRejectedValue(new Error('Upload failed')),
    });
    
    const testFile = new Blob(['test content'], { type: 'text/plain' });
    
    const result = await uploadToIPFS(testFile);
    
    expect(result).toEqual({
      success: false,
      error: 'Upload failed',
    });
  });

  it('should upload JSON to IPFS', async () => {
    const testJSON = { test: 'data', nested: { value: 123 } };
    
    const result = await uploadJSONToIPFS(testJSON);
    
    expect(result).toEqual({
      success: true,
      cid: 'QmTestCID',
      url: 'ipfs://QmTestCID',
      tokenURI: 'ipfs://QmTestCID',
      metadata: testJSON,
    });
  });

  it('should convert IPFS URL to HTTP URL', () => {
    const ipfsUrl = 'ipfs://QmTestCID';
    const httpUrl = getIPFSHttpUrl(ipfsUrl);
    
    expect(httpUrl).toBe('https://ipfs.io/ipfs/QmTestCID');
  });

  it('should handle different IPFS URL formats', () => {
    expect(getIPFSHttpUrl('ipfs://QmTestCID/file.jpg')).toBe('https://ipfs.io/ipfs/QmTestCID/file.jpg');
    expect(getIPFSHttpUrl('QmTestCID')).toBe('https://ipfs.io/ipfs/QmTestCID');
    expect(getIPFSHttpUrl('https://ipfs.io/ipfs/QmTestCID')).toBe('https://ipfs.io/ipfs/QmTestCID');
  });
}); 