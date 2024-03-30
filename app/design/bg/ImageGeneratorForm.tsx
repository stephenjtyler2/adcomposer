import React, {useState} from 'react';
import { Typography, SelectChangeEvent, Button} from '@mui/material';
import Selector from '@/lib/client/components/controlledFormFields/Selector';
import TextInputBox from '@/lib/client/components/controlledFormFields/TextInputBox';

const imgTypeOptions = [
    {optionLabel: "Piece of Abstract Art", optionValue: "abstract"},
    {optionLabel: "Landscape", optionValue: "landscape"},
    {optionLabel: "Party", optionValue: "party"},
    {optionLabel: "Sporting Event", optionValue: "sports"},
  ]
  
  const imgStyleOptions = [
    {optionLabel: "Cartoon", optionValue: "cartoon"},
    {optionLabel: "Sketch", optionValue: "sketch"},
    {optionLabel: "Photo Realistic", optionValue: "photo"},
  ]
  
  // Most common display ad sizes - https://support.google.com/displayvideo/answer/10261241?hl=en
  const imgSizeOptions = [
    {w:120, h:600}, {w:160, h:600},{w:250, h:250}, {w:300, h:50}, {w:300, h:100}, {w:300, h:250},
    {w:300, h:600}, {w:300, h:1050},{w:320, h:50}, {w:320, h:100}, {w:320, h:320}, {w:320, h:480},
    {w:336, h:280}, {w:360, h:592}, {w:360, h:640}, {w:375, h:667}, {w:468, h:60}, {w:728, h:90},
    {w:800, h:250}, {w:970, h:90}, {w:970, h:250}
  ].map((shape) => ({optionLabel: `${shape.w} x ${shape.h}`, optionValue: `${shape.w}x${shape.h}`}));
  
  type Props = {
    onGenerate: (prompt:string)=> void
  }

  export default function ImageGeneratorForm({onGenerate}:Props) {
    const [additionalInfoText, setAdditionalInfoText] = useState("");
    const [imgSize, setimgSize] = useState(imgSizeOptions[0]);
    const [imgType, setImgType] = useState(imgTypeOptions[0]);
    const [imgStyle, setImgStyle] = useState(imgStyleOptions[0]);
  
    const makePrompt= () => `
        An image with dimensions ${imgSize.optionValue} pixels, of a ${imgType.optionLabel.toLowerCase()} in a ${imgStyle.optionLabel.toLowerCase()} style.        
        The image should also have: ${additionalInfoText}
        `;

    return(<>
      <Typography variant='h6'>Image Generation Options</Typography>
      <Selector 
        type="dropdown" 
        value = {imgType.optionValue}
        label="Image Type" 
        instanceTag="imgType" 
        options = {imgTypeOptions}
        onSelectionChange = {(event:SelectChangeEvent)=>setImgType(imgTypeOptions.find(option=>option.optionValue == event.target.value)||imgTypeOptions[0])}
      />   
      <Selector 
        type="dropdown" 
        value = {imgStyle.optionValue}
        label="Image Style" 
        instanceTag="imgStyle" 
        options = {imgStyleOptions}
        onSelectionChange = {(event:SelectChangeEvent)=>setImgStyle(imgStyleOptions.find(option=>option.optionValue == event.target.value)||imgStyleOptions[0])}
        />
      <Selector 
        type="dropdown" 
        value = {imgSize.optionValue}
        label="Image Size" 
        instanceTag="imgSize" 
        options = {imgSizeOptions}
        onSelectionChange = {(event:SelectChangeEvent)=>setimgSize(imgSizeOptions.find(option=>option.optionValue == event.target.value)||imgSizeOptions[0])}
        />
      <TextInputBox 
        id="additionalInstructions"
        label = "Additional Instructions"
        onChange = {(event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>setAdditionalInfoText(event.target.value)}
        rows = {5}
        maxRows = {10}
        value = {additionalInfoText}
      />
      <center><Button variant="contained" onClick = {()=>onGenerate(makePrompt())}>Generate Image</Button></center>
  
    </>);
  }