// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock the matchMedia function which is not available in Jest
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock Web3 related objects
global.ethereum = {
  isMetaMask: true,
  request: jest.fn(),
  on: jest.fn(),
  removeListener: jest.fn(),
  chainId: '0x1',
  selectedAddress: null,
};

// Mock Audio API
window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();
window.HTMLMediaElement.prototype.load = jest.fn();

// Mock Web Audio API
class MockAudioContext {
  constructor() {
    this.destination = {
      maxChannelCount: 2,
    };
    this.createGain = jest.fn().mockReturnValue({
      connect: jest.fn(),
      gain: { value: 1, setValueAtTime: jest.fn() },
    });
    this.createOscillator = jest.fn().mockReturnValue({
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
      frequency: { value: 440, setValueAtTime: jest.fn() },
    });
    this.createAnalyser = jest.fn().mockReturnValue({
      connect: jest.fn(),
      fftSize: 2048,
      getByteTimeDomainData: jest.fn(),
      getByteFrequencyData: jest.fn(),
    });
    this.createBufferSource = jest.fn().mockReturnValue({
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
      buffer: null,
    });
    this.suspend = jest.fn().mockResolvedValue(undefined);
    this.resume = jest.fn().mockResolvedValue(undefined);
    this.createBuffer = jest.fn().mockReturnValue({
      getChannelData: jest.fn().mockReturnValue(new Float32Array(100)),
    });
  }
}

// Mock Tone.js
jest.mock('tone', () => {
  return {
    start: jest.fn(),
    Transport: {
      start: jest.fn(),
      stop: jest.fn(),
      pause: jest.fn(),
      bpm: { value: 120 },
      position: '0:0:0',
      scheduleRepeat: jest.fn(),
      schedule: jest.fn(),
      cancel: jest.fn(),
    },
    Synth: jest.fn().mockImplementation(() => ({
      toDestination: jest.fn().mockReturnThis(),
      triggerAttackRelease: jest.fn(),
    })),
    PolySynth: jest.fn().mockImplementation(() => ({
      toDestination: jest.fn().mockReturnThis(),
      triggerAttackRelease: jest.fn(),
    })),
    Player: jest.fn().mockImplementation(() => ({
      toDestination: jest.fn().mockReturnThis(),
      start: jest.fn(),
      stop: jest.fn(),
      connect: jest.fn(),
    })),
    Buffer: {
      from: jest.fn().mockResolvedValue({}),
    },
    Sampler: jest.fn().mockImplementation(() => ({
      toDestination: jest.fn().mockReturnThis(),
      triggerAttackRelease: jest.fn(),
    })),
    Reverb: jest.fn().mockImplementation(() => ({
      toDestination: jest.fn().mockReturnThis(),
      connect: jest.fn(),
    })),
    FeedbackDelay: jest.fn().mockImplementation(() => ({
      toDestination: jest.fn().mockReturnThis(),
      connect: jest.fn(),
    })),
    Compressor: jest.fn().mockImplementation(() => ({
      toDestination: jest.fn().mockReturnThis(),
      connect: jest.fn(),
    })),
    EQ3: jest.fn().mockImplementation(() => ({
      toDestination: jest.fn().mockReturnThis(),
      connect: jest.fn(),
    })),
    Limiter: jest.fn().mockImplementation(() => ({
      toDestination: jest.fn().mockReturnThis(),
      connect: jest.fn(),
    })),
    Master: {
      volume: { value: 0 },
    },
    context: new MockAudioContext(),
  };
});
 