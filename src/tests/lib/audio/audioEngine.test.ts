import * as Tone from 'tone';
import { AudioEngine } from '../../../lib/audio/audioEngine';

// Mock Tone.js
jest.mock('tone');

describe('AudioEngine', () => {
  let audioEngine: AudioEngine;

  beforeEach(() => {
    jest.clearAllMocks();
    audioEngine = new AudioEngine();
  });

  afterEach(() => {
    audioEngine.dispose();
  });

  it('should initialize with default values', () => {
    expect(audioEngine).toBeDefined();
    expect(audioEngine['initialized']).toBe(false);
    expect(audioEngine['bpm']).toBe(120);
  });

  it('should initialize audio context when init method is called', async () => {
    const startSpy = jest.spyOn(Tone, 'start');
    
    await audioEngine.init();
    
    expect(startSpy).toHaveBeenCalled();
    expect(audioEngine['initialized']).toBe(true);
  });

  it('should set BPM correctly', () => {
    audioEngine.setBPM(140);
    
    expect(audioEngine['bpm']).toBe(140);
    expect(Tone.Transport.bpm.value).toBe(140);
  });

  it('should start playback when play method is called', async () => {
    await audioEngine.init();
    audioEngine.play();
    
    expect(Tone.Transport.start).toHaveBeenCalled();
  });

  it('should stop playback when stop method is called', async () => {
    await audioEngine.init();
    audioEngine.stop();
    
    expect(Tone.Transport.stop).toHaveBeenCalled();
  });

  it('should load rhythm samples correctly', async () => {
    const mockSamples = {
      kick: 'kick.mp3',
      snare: 'snare.mp3',
      hihat: 'hihat.mp3',
    };
    
    await audioEngine.loadRhythmSamples(mockSamples);
    
    // Check if players were created for each sample
    expect(Tone.Player).toHaveBeenCalledTimes(Object.keys(mockSamples).length);
  });

  it('should schedule rhythm patterns correctly', () => {
    const mockPattern = [
      [true, false, false, false],
      [false, false, true, false],
      [false, true, false, true],
    ];
    
    const mockDrumTypes = ['kick', 'snare', 'hihat'];
    
    audioEngine.scheduleRhythmPattern(mockPattern, mockDrumTypes, '8n');
    
    expect(Tone.Transport.scheduleRepeat).toHaveBeenCalled();
  });

  it('should schedule melody sequence correctly', () => {
    const mockNotes = [
      { note: 'C4', time: 0, duration: '8n', velocity: 0.8 },
      { note: 'E4', time: 0.5, duration: '8n', velocity: 0.7 },
      { note: 'G4', time: 1, duration: '8n', velocity: 0.9 },
    ];
    
    audioEngine.scheduleMelodySequence(mockNotes);
    
    expect(Tone.Transport.schedule).toHaveBeenCalledTimes(mockNotes.length);
  });

  it('should play chords correctly', () => {
    audioEngine.playChord(['C4', 'E4', 'G4'], '4n');
    
    // PolySynth should be used for chords
    expect(Tone.PolySynth).toHaveBeenCalled();
    expect(audioEngine['harmonySynth'].triggerAttackRelease).toHaveBeenCalledWith(
      ['C4', 'E4', 'G4'],
      '4n'
    );
  });

  it('should schedule chord progression correctly', () => {
    const mockChords = [
      ['C4', 'E4', 'G4'],
      ['F4', 'A4', 'C5'],
      ['G4', 'B4', 'D5'],
    ];
    
    const mockDurations = ['2n', '2n', '2n'];
    
    audioEngine.scheduleChordProgression(mockChords, mockDurations);
    
    expect(Tone.Transport.schedule).toHaveBeenCalledTimes(mockChords.length);
  });

  it('should export audio as blob', async () => {
    // Mock the OfflineAudioContext
    const mockOfflineContext = {
      startRendering: jest.fn().mockResolvedValue({}),
      destination: {},
    };
    global.OfflineAudioContext = jest.fn().mockImplementation(() => mockOfflineContext);
    
    await audioEngine.exportAudio(10);
    
    expect(mockOfflineContext.startRendering).toHaveBeenCalled();
  });

  it('should dispose resources correctly', () => {
    audioEngine.dispose();
    
    expect(Tone.Transport.cancel).toHaveBeenCalledWith(0);
  });
}); 