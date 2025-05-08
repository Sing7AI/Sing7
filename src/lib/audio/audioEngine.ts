import * as Tone from 'tone';

/**
 * Core Audio Engine service using Tone.js
 */
export class AudioEngine {
  private initialized: boolean = false;
  private transport: Tone.Transport;
  private masterChannel: Tone.Channel;
  
  // Rhythm-specific players
  private rhythmPlayers: Map<string, Tone.Player> = new Map();
  
  // Melody and harmony synthesizers
  private melodySynth: Tone.PolySynth;
  private harmonySynth: Tone.PolySynth;
  
  // Sound synthesizer for sampled instruments
  private soundSynth: Tone.Sampler | null = null;
  
  // Audio effects
  private reverb: Tone.Reverb;
  private delay: Tone.FeedbackDelay;
  private compressor: Tone.Compressor;
  private eq: Tone.EQ3;
  private limiter: Tone.Limiter;

  constructor() {
    // Initialize audio context and set up basic synthesizers
    this.transport = Tone.Transport;
    this.transport.bpm.value = 120;
    
    // Set up master channel
    this.masterChannel = new Tone.Channel().toDestination();
    this.masterChannel.volume.value = -6;
    
    // Set up effects
    this.reverb = new Tone.Reverb(2.5).connect(this.masterChannel);
    this.delay = new Tone.FeedbackDelay(0.25, 0.3).connect(this.reverb);
    this.compressor = new Tone.Compressor({
      ratio: 4,
      threshold: -24,
      attack: 0.005,
      release: 0.1
    }).connect(this.delay);
    this.eq = new Tone.EQ3().connect(this.compressor);
    this.limiter = new Tone.Limiter(-1).connect(this.eq);
    
    // Create synthesizers
    this.melodySynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.1, decay: 0.1, sustain: 0.3, release: 0.4 }
    }).connect(this.limiter);
    
    this.harmonySynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.1, decay: 0.3, sustain: 0.4, release: 0.8 }
    }).connect(this.limiter);
  }
  
  /**
   * Initialize the audio context (must be called after user interaction)
   */
  async initializeAudioContext(): Promise<void> {
    if (this.initialized) return;
    
    await Tone.start();
    this.initialized = true;
    console.log('Audio context initialized');
  }
  
  /**
   * Set the BPM (beats per minute)
   */
  setBPM(bpm: number): void {
    this.transport.bpm.value = bpm;
  }
  
  /**
   * Start playback
   */
  start(): void {
    if (!this.initialized) {
      console.warn('Audio context not initialized. Call initializeAudioContext first.');
      return;
    }
    this.transport.start();
  }
  
  /**
   * Stop playback
   */
  stop(): void {
    this.transport.stop();
  }
  
  /**
   * Load a rhythm sample
   */
  async loadRhythmSample(id: string, url: string): Promise<void> {
    const player = new Tone.Player({
      url,
      onload: () => console.log(`Loaded rhythm sample: ${id}`),
    }).connect(this.limiter);
    
    this.rhythmPlayers.set(id, player);
  }
  
  /**
   * Schedule a rhythm pattern
   */
  scheduleRhythmPattern(
    patternData: Array<{ drumId: string; steps: boolean[] }>,
    subdivision: string = '16n'
  ): Tone.Sequence {
    const sequence = new Tone.Sequence(
      (time, index) => {
        patternData.forEach(({ drumId, steps }) => {
          if (steps[index] && this.rhythmPlayers.has(drumId)) {
            const player = this.rhythmPlayers.get(drumId);
            player?.start(time);
          }
        });
      },
      [...Array(patternData[0]?.steps.length || 16).keys()],
      subdivision
    );
    
    sequence.start(0);
    return sequence;
  }
  
  /**
   * Schedule a melody sequence
   */
  scheduleMelodySequence(
    notes: Array<{ note: string; duration: string; time: number }>,
    subdivision: string = '16n'
  ): Tone.Part {
    const part = new Tone.Part((time, note) => {
      this.melodySynth.triggerAttackRelease(
        note.note, 
        note.duration, 
        time
      );
    }, notes.map(note => ({ time: note.time, note })));
    
    part.start(0);
    return part;
  }
  
  /**
   * Play a chord
   */
  playChord(chord: string[], duration: string = '1n'): void {
    this.harmonySynth.triggerAttackRelease(chord, duration);
  }
  
  /**
   * Schedule a chord progression
   */
  scheduleChordProgression(
    chords: Array<{ chord: string[]; duration: string; time: number }>
  ): Tone.Part {
    const part = new Tone.Part((time, chord) => {
      this.harmonySynth.triggerAttackRelease(
        chord.chord, 
        chord.duration, 
        time
      );
    }, chords.map(chord => ({ time: chord.time, chord })));
    
    part.start(0);
    part.loop = true;
    part.loopEnd = '4m';
    return part;
  }
  
  /**
   * Create a sound synthesizer with samples
   */
  async createSoundSynthesizer(
    samples: Record<string, string>,
    baseUrl: string = ''
  ): Promise<Tone.Sampler> {
    return new Promise((resolve) => {
      this.soundSynth = new Tone.Sampler({
        urls: samples,
        baseUrl,
        onload: () => {
          if (this.soundSynth) {
            this.soundSynth.connect(this.limiter);
            resolve(this.soundSynth);
          }
        }
      });
    });
  }
  
  /**
   * Export audio as a blob
   */
  async exportAudio(duration: number): Promise<Blob> {
    return new Promise((resolve) => {
      const recorder = new Tone.Recorder();
      this.masterChannel.connect(recorder);
      
      // Start recording
      recorder.start();
      
      // Start transport if not already started
      const wasPlaying = this.transport.state === 'started';
      if (!wasPlaying) {
        this.transport.start();
      }
      
      // Stop recording after the duration
      setTimeout(async () => {
        if (!wasPlaying) {
          this.transport.stop();
        }
        
        const recording = await recorder.stop();
        this.masterChannel.disconnect(recorder);
        resolve(recording);
      }, duration * 1000);
    });
  }
  
  /**
   * Dispose of all resources
   */
  dispose(): void {
    this.transport.stop();
    this.transport.cancel();
    
    this.melodySynth.dispose();
    this.harmonySynth.dispose();
    this.soundSynth?.dispose();
    
    this.reverb.dispose();
    this.delay.dispose();
    this.compressor.dispose();
    this.eq.dispose();
    this.limiter.dispose();
    
    this.masterChannel.dispose();
    
    // Dispose of all players
    this.rhythmPlayers.forEach(player => player.dispose());
    this.rhythmPlayers.clear();
    
        urls: sampleUrls,
        onload: () => console.log('Sound synth loaded'),
      }).connect(this.effects.reverb);
    } catch (error) {
      console.error('Failed to create sound synth:', error);
      throw error;
    }
  }

  /**
   * Export the current audio as a blob
   */
  async exportAudio(): Promise<Blob> {
    // Create a recording context
    const recorder = new Tone.Recorder();
    this.masterChannel.connect(recorder);

    // Start recording
    recorder.start();

    // Play the audio
    this.play();

    // Wait for the audio to finish (assuming 4 bars at current tempo)
    const secondsToRecord = (4 * 4 * 60) / this.transport.bpm.value;
    
    await new Promise(resolve => setTimeout(resolve, secondsToRecord * 1000));

    // Stop recording
    this.stop();
    const recording = await recorder.stop();

    // Return the blob
    return recording;
  }

  /**
   * Dispose all resources
   */
  dispose(): void {
    this.rhythmPlayers.forEach(player => player.dispose());
    this.rhythmPlayers.clear();
    this.melodySynth.dispose();
    this.harmonySynth.dispose();
    if (this.soundSynth) this.soundSynth.dispose();
    Object.values(this.effects).forEach(effect => effect.dispose());
    this.masterChannel.dispose();
  }
}

// Create a singleton instance
const audioEngine = new AudioEngine();

export default audioEngine; 