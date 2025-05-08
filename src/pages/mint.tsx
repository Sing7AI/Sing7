import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useWallet } from '../hooks/useWallet';
import { contractService } from '../services/blockchain/contractService';
import { Spinner } from '../components/ui/Spinner';

const MintPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { connected, address, chainId } = useSelector((state: RootState) => state.wallet);
  const { connect } = useWallet();
  const { currentProject } = useSelector((state: RootState) => state.audio);
  
  const [name, setName] = useState(currentProject?.name || '');
  const [description, setDescription] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [royaltyPercentage, setRoyaltyPercentage] = useState(10); // Default 10%
  const [isExporting, setIsExporting] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  useEffect(() => {
    if (!connected) {
      // Prompt to connect wallet
      setError('Please connect your wallet to mint NFTs');
    }
  }, [connected]);
  
  const handleExportAudio = async () => {
    setIsExporting(true);
    setError(null);
    
    try {
      // In a real app, this would call audioEngine.exportAudio()
      // For now, we'll simulate it
      
      setTimeout(() => {
        // Create a mock audio blob
        const mockBlob = new Blob(['audio data'], { type: 'audio/wav' });
        setAudioBlob(mockBlob);
        
        // Create a URL for preview
        const url = URL.createObjectURL(mockBlob);
        setAudioPreviewUrl(url);
        
        setIsExporting(false);
      }, 2000);
    } catch (err) {
      setError('Failed to export audio: ' + (err instanceof Error ? err.message : String(err)));
      setIsExporting(false);
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleMint = async () => {
    if (!connected) {
      connect();
      return;
    }
    
    if (!audioBlob) {
      setError('Please export your music first');
      return;
    }
    
    if (!name.trim()) {
      setError('Please provide a name for your NFT');
      return;
    }
    
    setIsMinting(true);
    setError(null);
    
    try {
      // Create metadata
      const metadata = {
        name,
        description,
        bpm: currentProject?.bpm || 120,
        key: 'C Major', // This would be determined from the project
        tags
      };
      
      // Mint the NFT
      // In a real app, this would call contractService.mintMusicNFT()
      // For now, we'll simulate it
      
      setTimeout(() => {
        // Mock successful minting
        setIsMinting(false);
        
        // Redirect to the marketplace page
        router.push('/marketplace');
      }, 3000);
    } catch (err) {
      setError('Failed to mint NFT: ' + (err instanceof Error ? err.message : String(err)));
      setIsMinting(false);
    }
  };
  
  return (
    <Container>
      <Title>Mint Your Music as an NFT</Title>
      <Description>
        Transform your musical creation into a valuable NFT on the blockchain.
        Set royalties to earn from future sales of your work.
      </Description>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Form>
        <FormGroup>
          <Label>Project Name</Label>
          <Input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Give your NFT a name"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Description</Label>
          <TextArea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your music... What inspired you? What makes it special?"
            rows={4}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Music File</Label>
          {audioPreviewUrl ? (
            <AudioPreview>
              <audio controls src={audioPreviewUrl} />
              <PreviewInfo>Your music is ready to mint</PreviewInfo>
            </AudioPreview>
          ) : (
            <ExportButton onClick={handleExportAudio} disabled={isExporting}>
              {isExporting ? (
                <>
                  <Spinner size={24} /> Exporting...
                </>
              ) : (
                'Export Music from Project'
              )}
            </ExportButton>
          )}
        </FormGroup>
        
        <FormGroup>
          <Label>Cover Image (Optional)</Label>
          {imagePreviewUrl ? (
            <ImagePreview>
              <PreviewImage src={imagePreviewUrl} alt="Cover image preview" />
              <ChangeImageButton onClick={() => document.getElementById('imageInput')?.click()}>
                Change Image
              </ChangeImageButton>
            </ImagePreview>
          ) : (
            <ImageUploadButton onClick={() => document.getElementById('imageInput')?.click()}>
              Select Cover Image
            </ImageUploadButton>
          )}
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Tags</Label>
          <TagsContainer>
            {tags.map(tag => (
              <Tag key={tag}>
                {tag}
                <RemoveTagButton onClick={() => removeTag(tag)}>×</RemoveTagButton>
              </Tag>
            ))}
          </TagsContainer>
          <TagInputContainer>
            <TagInput 
              type="text" 
              value={tagInput} 
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag (e.g., ambient, electronic)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            />
            <AddTagButton onClick={addTag}>Add</AddTagButton>
          </TagInputContainer>
        </FormGroup>
        
        <FormGroup>
          <Label>Creator Royalty (%)</Label>
          <RoyaltyContainer>
            <RoyaltyInput 
              type="number" 
              min="0" 
              max="50"
              value={royaltyPercentage} 
              onChange={(e) => setRoyaltyPercentage(Number(e.target.value))}
            />
            <RoyaltyInfo>
              You'll receive {royaltyPercentage}% of the sale price each time your NFT is sold on the secondary market.
            </RoyaltyInfo>
          </RoyaltyContainer>
        </FormGroup>
        
        <MintButton onClick={handleMint} disabled={isMinting || !audioBlob || !name.trim()}>
          {isMinting ? (
            <>
              <Spinner size={24} /> Minting NFT...
            </>
          ) : connected ? (
            'Mint NFT'
          ) : (
            'Connect Wallet to Mint'
          )}
        </MintButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 32px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #FFFFFF;
`;

const Description = styled.p`
  font-size: 18px;
  color: #E0E0E0;
  margin: 0 0 32px 0;
`;

const ErrorMessage = styled.div`
  background-color: rgba(255, 87, 87, 0.1);
  border: 1px solid #FF5757;
  color: #FF5757;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
`;

const Input = styled.input`
  background-color: #2A2A2A;
  border: 1px solid #3A3A3A;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  color: #FFFFFF;
  
  &:focus {
    outline: none;
    border-color: #BF5AF2;
  }
`;

const TextArea = styled.textarea`
  background-color: #2A2A2A;
  border: 1px solid #3A3A3A;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  color: #FFFFFF;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #BF5AF2;
  }
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #2A2A2A;
  color: #FFFFFF;
  border: 1px solid #3A3A3A;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover:not(:disabled) {
    background-color: #3A3A3A;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const AudioPreview = styled.div`
  background-color: #2A2A2A;
  border: 1px solid #3A3A3A;
  border-radius: 8px;
  padding: 16px;
  
  audio {
    width: 100%;
  }
`;

const PreviewInfo = styled.div`
  font-size: 14px;
  color: #9E9E9E;
  margin-top: 8px;
`;

const ImageUploadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2A2A2A;
  color: #FFFFFF;
  border: 1px dashed #3A3A3A;
  border-radius: 8px;
  padding: 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3A3A3A;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
`;

const PreviewImage = styled.img`
  width: 100%;
  display: block;
`;

const ChangeImageButton = styled.button`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  background-color: #3A3A3A;
  color: #FFFFFF;
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 14px;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: #9E9E9E;
  font-size: 16px;
  margin-left: 8px;
  cursor: pointer;
  padding: 0 4px;
  
  &:hover {
    color: #FFFFFF;
  }
`;

const TagInputContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const TagInput = styled(Input)`
  flex: 1;
`;

const AddTagButton = styled.button`
  background-color: #3A3A3A;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #4A4A4A;
  }
`;

const RoyaltyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RoyaltyInput = styled(Input)`
  width: 80px;
`;

const RoyaltyInfo = styled.div`
  font-size: 14px;
  color: #9E9E9E;
`;

const MintButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #BF5AF2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px 24px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 16px;
  
  &:hover:not(:disabled) {
    background-color: #A347D1;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default MintPage; 