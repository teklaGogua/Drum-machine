
import './App.css';
import React from 'react';

const sounds = [
  {
    key: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    key: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    key: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    key: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    key: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    key: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    key: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    key: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    key: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
]

function App() {
  return (
    <div className="App">
      <div><Drum /></div>
    </div>
  );
}

//Defines general things for App
class Drum extends React.Component{
  render(){
    return(
      <div id="drum-machine">
        <div id="display">
          <h1>Play the sound</h1>
        {sounds.map((vol, idx) => (
            <DrumPad text={vol.key} key={idx} audio={vol.url} id={vol.id}/>
          ))}
        </div>
      </div>
    );
  }
}

//Main functionalities for App
class DrumPad extends React.Component{
  constructor(props){
    super(props);
    
    this.myRef = React.createRef();
    
    document.addEventListener('keydown', (e) => {
      if(e.key === this.props.text || e.key === this.props.text.toLowerCase()){
    this.myRef.current.play();
    
    const parent = this.myRef.current.parentNode;
    parent.classList.add('active');
    
    const display = parent.parentNode;
    
    display.querySelector('h1').innerText = this.props.id;
      }
    })
  };
  
   componentDidMount(){
     this.myRef.current.addEventListener('ended', () => {const parent = this.myRef.current.parentNode;
     parent.classList.remove('active');
  })
   }
  
  playSound = () => {
    this.myRef.current.play();
    
    const parent = this.myRef.current.parentNode;
    parent.classList.add('active');
    
    const display = parent.parentNode;
    
    display.querySelector('h1').innerText = this.props.id;
  }
  
  render(){
    return(
      <div className = "drum-pad"
        onClick={this.playSound}
        id={this.props.text}>
        {this.props.text}
        <audio className = "clip"
          src={this.props.audio} 
          ref={this.myRef}
          id={this.props.text}/>
      </div>
    );
  }
}

export default App;
