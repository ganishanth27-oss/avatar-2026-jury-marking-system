const EVENT_CRITERIA = {
  "Pencil Sketch": [
    { name: "Creativity", maxMarks: 20 },
    { name: "Drawing Skill", maxMarks: 20 },
    { name: "Accuracy & Detailing", maxMarks: 15 },
    { name: "Composition", maxMarks: 15 },
    { name: "Theme Interpretation", maxMarks: 15 },
    { name: "Shading & Technique", maxMarks: 10 },
    { name: "Overall Presentation", maxMarks: 5 },
  ],

  "Photography": [
    { name: "Composition", maxMarks: 20 },
    { name: "Creativity", maxMarks: 20 },
    { name: "Theme Interpretation", maxMarks: 15 },
    { name: "Technical Quality", maxMarks: 15 },
    { name: "Originality", maxMarks: 15 },
    { name: "Visual Impact", maxMarks: 10 },
    { name: "Overall Presentation", maxMarks: 5 },
  ],

  "Bridal Makeup": [
    { name: "Makeup Technique", maxMarks: 20 },
    { name: "Theme Interpretation", maxMarks: 20 },
    { name: "Creativity", maxMarks: 15 },
    { name: "Blending & Finishing", maxMarks: 15 },
    { name: "Colour Coordination", maxMarks: 10 },
    { name: "Overall Appearance", maxMarks: 10 },
    { name: "Hygiene & Presentation", maxMarks: 10 },
  ],

  "Mehendi": [
    { name: "Design Creativity", maxMarks: 20 },
    { name: "Precision", maxMarks: 20 },
    { name: "Neatness", maxMarks: 15 },
    { name: "Pattern & Detailing", maxMarks: 15 },
    { name: "Theme Interpretation", maxMarks: 10 },
    { name: "Time Management", maxMarks: 10 },
    { name: "Overall Presentation", maxMarks: 10 },
  ],

  "Chill Chef": [
    { name: "Taste", maxMarks: 25 },
    { name: "Presentation", maxMarks: 20 },
    { name: "Creativity", maxMarks: 15 },
    { name: "Nutrition", maxMarks: 15 },
    { name: "Hygiene", maxMarks: 10 },
    { name: "Ingredient Combination", maxMarks: 10 },
    { name: "Overall Presentation", maxMarks: 5 },
  ],

  "Freeze Dance": [
    { name: "Rhythm & Dancing", maxMarks: 25 },
    { name: "Timing", maxMarks: 20 },
    { name: "Reaction Speed", maxMarks: 20 },
    { name: "Energy", maxMarks: 15 },
    { name: "Creativity", maxMarks: 10 },
    { name: "Stage Presence", maxMarks: 5 },
    { name: "Overall Performance", maxMarks: 5 },
  ],

  "Wealth Out of Waste": [
    { name: "Creativity", maxMarks: 20 },
    { name: "Use of Waste Materials", maxMarks: 20 },
    { name: "Utility", maxMarks: 15 },
    { name: "Originality", maxMarks: 15 },
    { name: "Environmental Value", maxMarks: 10 },
    { name: "Craftsmanship", maxMarks: 10 },
    { name: "Presentation", maxMarks: 10 },
  ],

  "Reels Challenge": [
    { name: "Creativity", maxMarks: 20 },
    { name: "Content Quality", maxMarks: 20 },
    { name: "Storytelling", maxMarks: 15 },
    { name: "Entertainment Value", maxMarks: 15 },
    { name: "Video Quality", maxMarks: 10 },
    { name: "Originality", maxMarks: 10 },
    { name: "Theme Relevance", maxMarks: 5 },
    { name: "Overall Impact", maxMarks: 5 },
  ],

  "Solo Song": [
    { name: "Voice Quality", maxMarks: 25 },
    { name: "Pitch & Rhythm", maxMarks: 20 },
    { name: "Expression & Emotion", maxMarks: 20 },
    { name: "Song Selection", maxMarks: 10 },
    { name: "Stage Presence", maxMarks: 10 },
    { name: "Pronunciation", maxMarks: 5 },
    { name: "Overall Performance", maxMarks: 10 },
  ],

  "Solo Dance": [
    { name: "Technique & Execution", maxMarks: 25 },
    { name: "Rhythm & Coordination", maxMarks: 20 },
    { name: "Expression", maxMarks: 15 },
    { name: "Choreography", maxMarks: 15 },
    { name: "Stage Presence", maxMarks: 10 },
    { name: "Creativity", maxMarks: 10 },
    { name: "Overall Performance", maxMarks: 5 },
  ],

  "Group Dance": [
    { name: "Synchronization", maxMarks: 25 },
    { name: "Choreography", maxMarks: 20 },
    { name: "Coordination", maxMarks: 15 },
    { name: "Creativity", maxMarks: 15 },
    { name: "Stage Presence", maxMarks: 10 },
    { name: "Music & Rhythm", maxMarks: 5 },
    { name: "Team Performance", maxMarks: 5 },
    { name: "Overall Presentation", maxMarks: 5 },
  ],

  "Instrumental Music": [
    { name: "Technical Skill", maxMarks: 25 },
    { name: "Rhythm & Timing", maxMarks: 20 },
    { name: "Musical Expression", maxMarks: 20 },
    { name: "Accuracy", maxMarks: 15 },
    { name: "Creativity", maxMarks: 10 },
    { name: "Stage Presentation", maxMarks: 5 },
    { name: "Overall Performance", maxMarks: 5 },
  ],

  "Mime": [
    { name: "Expression & Acting", maxMarks: 20 },
    { name: "Storytelling", maxMarks: 20 },
    { name: "Team Coordination", maxMarks: 15 },
    { name: "Creativity", maxMarks: 15 },
    { name: "Message / Theme", maxMarks: 15 },
    { name: "Use of Music & Props", maxMarks: 5 },
    { name: "Stage Presentation", maxMarks: 5 },
    { name: "Overall Impact", maxMarks: 5 },
  ],

  "Group Song": [
    { name: "Vocal Quality", maxMarks: 20 },
    { name: "Harmony & Coordination", maxMarks: 20 },
    { name: "Pitch & Rhythm", maxMarks: 15 },
    { name: "Expression & Emotion", maxMarks: 15 },
    { name: "Song Selection", maxMarks: 10 },
    { name: "Stage Presence", maxMarks: 10 },
    { name: "Team Performance", maxMarks: 5 },
    { name: "Overall Performance", maxMarks: 5 },
  ],

  "Variety Performance": [
    { name: "Creativity", maxMarks: 20 },
    { name: "Entertainment Value", maxMarks: 20 },
    { name: "Talent & Skill", maxMarks: 15 },
    { name: "Stage Presence", maxMarks: 15 },
    { name: "Coordination", maxMarks: 10 },
    { name: "Originality", maxMarks: 10 },
    { name: "Audience Engagement", maxMarks: 5 },
    { name: "Overall Impact", maxMarks: 5 },
  ],

  "Fashion Parade": [
    { name: "Theme Interpretation", maxMarks: 20 },
    { name: "Costume & Styling", maxMarks: 20 },
    { name: "Creativity", maxMarks: 15 },
    { name: "Presentation", maxMarks: 15 },
    { name: "Confidence", maxMarks: 10 },
    { name: "Team Coordination", maxMarks: 5 },
    { name: "Walk / Stage Presence", maxMarks: 10 },
    { name: "Overall Impact", maxMarks: 5 },
  ],

  "Mr. & Ms. Avatar": [
    { name: "Confidence", maxMarks: 20 },
    { name: "Communication Skills", maxMarks: 15 },
    { name: "Personality", maxMarks: 15 },
    { name: "Talent Performance", maxMarks: 15 },
    { name: "Stage Presence", maxMarks: 10 },
    { name: "Question & Answer", maxMarks: 15 },
    { name: "Grooming & Presentation", maxMarks: 5 },
    { name: "Overall Impression", maxMarks: 5 },
  ],
};

export default EVENT_CRITERIA;