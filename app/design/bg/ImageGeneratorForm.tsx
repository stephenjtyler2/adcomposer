import React, { useState } from 'react';
import { Typography, Box, SelectChangeEvent, Button } from '@mui/material';
import Selector from '@/components/controlledFormFields/Selector';
import TextInputBox from '@/components/controlledFormFields/TextInputBox';
import { targetMarkets } from '@/config/targetMarkets';
import { ImageAspectRatio, ImageStyle } from '@backend/apitypes';

const showImageAspectRatio: boolean = process.env.NEXT_PUBLIC_DALL_E_VERSION === "3";

interface IImgStyleOption {
  optionLabel: string,
  optionValue: ImageStyle
}

const imgStyleOptions: IImgStyleOption[] = [
  { optionLabel: "Cartoon", optionValue: "cartoon" },
  { optionLabel: "Sketch", optionValue: "sketch" },
  { optionLabel: "Photo Realistic", optionValue: "photo" },
]

interface IImgAspectRatioOption {
  optionLabel: string,
  optionValue: ImageAspectRatio
}

const imgAspectRatioOptions: IImgAspectRatioOption[] = [
  { optionLabel: "Square", optionValue: "square" },
  { optionLabel: "Portrait", optionValue: "portrait" },
  { optionLabel: "Landscape", optionValue: "landscape" },
]

const targetMarketOptions = targetMarkets.map((market) => ({
  optionLabel: market, optionValue: market.toLowerCase().replace(/ /g, '')
}));

type Props = {
  onGenerate: (prompt: string, imageAspectRatio: ImageAspectRatio) => void,
  generateButtonDisabled: boolean
}

export default function ImageGeneratorForm({ onGenerate, generateButtonDisabled }: Props) {
  const [subjectText, setSubjectText] = useState("");
  const [additionalInfoText, setAdditionalInfoText] = useState("");
  const [imgStyle, setImgStyle] = useState(imgStyleOptions[0]);
  const [targetMarket, setTargetMarket] = useState(targetMarketOptions[0]);
  const [imgAspectRatio, setImgAspectRatio] = useState(imgAspectRatioOptions[0]);

  const makePrompt = () => {
    let prompt = `An image in a ${imgStyle.optionLabel.toLowerCase()} style appropriate for an audience in ${targetMarket.optionLabel}.`;
    prompt = prompt + `The main subject of the image should be ${subjectText.toLowerCase()}.`;
    if (additionalInfoText.length > 0) prompt = prompt + `The image should also feature: ${additionalInfoText}.`;
    prompt = prompt.replace(/\.\./g, ".");
    return prompt;
  }


  return (<>
    <Typography variant='h6'><b>Image Generator</b></Typography>
    <Selector
      type="dropdown"
      value={targetMarket.optionValue}
      label="Target Market"
      instanceTag="targetMarket"
      options={targetMarketOptions}
      onSelectionChange={(event: SelectChangeEvent) => setTargetMarket(targetMarketOptions.find(option => option.optionValue == event.target.value) || targetMarketOptions[0])}
    />
    <Selector
      type="dropdown"
      value={imgStyle.optionValue}
      label="Image Style"
      instanceTag="imgStyle"
      options={imgStyleOptions}
      onSelectionChange={(event: SelectChangeEvent) => setImgStyle(imgStyleOptions.find(option => option.optionValue == event.target.value) || imgStyleOptions[0])}
    />
    {showImageAspectRatio &&
      <Selector
        type="dropdown"
        value={imgAspectRatio.optionValue}
        label="Aspect Ratio"
        instanceTag="imgAspectRatio"
        options={imgAspectRatioOptions}
        onSelectionChange={(event: SelectChangeEvent) => setImgAspectRatio(imgAspectRatioOptions.find(option => option.optionValue == event.target.value) || imgAspectRatioOptions[0])}
      />
    }
    <TextInputBox
      id="subject"
      label="Main subject of the image"
      onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSubjectText(event.target.value)}
      placeholder="e.g. A sports stadium"
      rows={5}
      value={subjectText}
    />
    <TextInputBox
      id="additionalInstructions"
      label="Other required elements"
      onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setAdditionalInfoText(event.target.value)}
      placeholder="e.g. With a dog in the foreground."
      rows={4}
      value={additionalInfoText}
    />
    <Box sx={{ my: 2 }}>
      <center>
        <Button
          variant="contained"
          disabled={generateButtonDisabled}
          onClick={() => onGenerate(makePrompt(), imgAspectRatio.optionValue)}>
          Generate Image
        </Button>
      </center>
    </Box>

  </>);
}